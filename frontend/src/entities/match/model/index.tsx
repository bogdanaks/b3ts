import { useQuery } from "@tanstack/react-query"
import Big from "big.js"
import React, { useEffect, useState } from "react"
import { fetcherMatchesBySport } from "shared/api"
import { useMyContract } from "shared/hooks/use-my-contract"

export const useMatches = (sport: string) => {
  const { getMatchesByIds, getMatchesLength, contractState, subscribeEvent } =
    useMyContract()
  const [matches, setMatches] = useState<MatchWithSmart[]>([])
  const [isSubscribe, setIsSubscribe] = useState(false)

  const { data, isSuccess } = useQuery(
    ["matches", sport],
    fetcherMatchesBySport(sport),
    {
      enabled: !!sport,
    }
  )

  const updateBets = ({
    id,
    matchId,
    amount,
    market,
    user,
  }: {
    id: Big
    matchId: Big
    amount: Big
    market: string
    user: string
  }) => {
    setMatches((prevState) => [
      ...prevState.map((match) => {
        if (Number(match.id) === matchId.toNumber()) {
          if (!match.matchFromSmart) return match
          const alreadyBet = match.matchFromSmart.bets.some((bet) =>
            new Big(bet.id).eq(id)
          )

          if (alreadyBet) return match
          const newBets = [
            ...match.matchFromSmart.bets,
            {
              id,
              user,
              market,
              amount,
              createdAt: Date.now(),
            },
          ]

          return {
            ...match,
            matchFromSmart: {
              ...match.matchFromSmart,
              bets: newBets,
            },
          }
        }
        return match
      }),
    ])
  }

  useEffect(() => {
    if (contractState !== "connected") return
    if (!isSuccess) return
    ;(async () => {
      const mLen = await getMatchesLength()
      if (!mLen) return

      const matchesWithSmart = [] as MatchWithSmart[]
      const matchesIds = data.map((item) => Number(item.id))
      const matchesSmartContract = await getMatchesByIds(matchesIds)

      for (const match of data) {
        const matchFind = matchesSmartContract.find(
          (item) => Number(item.id) === Number(match.id)
        )
        if (!matchFind) continue

        matchesWithSmart.push({ ...match, matchFromSmart: matchFind || null })
      }

      setMatches(matchesWithSmart)
    })()
  }, [data, contractState, isSuccess])

  useEffect(() => {
    if (!matches.length) return
    if (contractState !== "connected") return
    if (isSubscribe) return
    subscribeEvent("AddBet", updateBets)
    setIsSubscribe(true)
  }, [matches, contractState])

  return {
    matches,
  }
}
