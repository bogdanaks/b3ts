import { useInfiniteQuery } from "@tanstack/react-query"
import Big from "big.js"
import React, { useEffect, useState } from "react"
import { fetcherMatchesBySport } from "shared/api"
import { useMyContract } from "shared/hooks/use-my-contract"

export const useMatches = (sport: string) => {
  const { getMatchesByIds, getMatchesLength, contractState, subscribeEvent } =
    useMyContract()
  const [matches, setMatches] = useState<{
    pages: {
      data: MatchWithSmart[]
      nextPage: number
      isLastPage: boolean
    }[]
    pageParams: unknown[]
  } | null>(null)
  const [isSubscribe, setIsSubscribe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { isSuccess, data, fetchNextPage } = useInfiniteQuery(
    ["matches", sport],
    async ({ pageParam = 1 }) => {
      const limit = 10
      const res = await fetcherMatchesBySport(sport, limit, pageParam)()

      return {
        data: res.data,
        nextPage: Number(res.page) + 1,
        isLastPage: Math.ceil(res.total / limit) === pageParam,
      }
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
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
    setIsLoading(true)
    setMatches((prevState) =>
      prevState
        ? {
            ...prevState,
            pages: prevState?.pages.map((page) => ({
              ...page,
              data: page.data.map((match) => {
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
            })),
          }
        : null
    )
    setIsLoading(false)
  }

  useEffect(() => {
    if (contractState !== "connected") return
    if (!isSuccess) return
    ;(async () => {
      const mLen = await getMatchesLength()
      if (!mLen) return
      setIsLoading(true)

      const copyData = { ...data } as {
        pages: {
          data: MatchWithSmart[]
          nextPage: number
          isLastPage: boolean
        }[]
        pageParams: unknown[]
      }

      for (const page of copyData.pages) {
        const matchesIds = page.data.map((item) => Number(item.id))
        const matchesSmartContract = await getMatchesByIds(matchesIds)

        for (const match of page.data) {
          const matchFind = matchesSmartContract.find(
            (item) => Number(item.id) === Number(match.id)
          )
          if (!matchFind) continue

          match.matchFromSmart = matchFind || null
        }
      }

      setIsLoading(false)
      setMatches(copyData)
    })()
  }, [data, contractState, isSuccess])

  useEffect(() => {
    if (!matches) return
    if (contractState !== "connected") return
    if (isSubscribe) return
    subscribeEvent("AddBet", updateBets)
    setIsSubscribe(true)
  }, [matches, contractState])

  return {
    isLastPage: isSuccess && data.pages[data.pages.length - 1].isLastPage,
    isLoading,
    fetchNextPage,
    matches,
  }
}