import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { fetcherMatchesByIds } from "shared/api"
import { useMyContract } from "shared/hooks/use-my-contract"

export const useMyMatches = (sport: string) => {
  const { getMatchesLength, contractState, getMatchesByUser } = useMyContract()
  const [matchesLen, setMatchesLen] = useState(0)
  const [myMatchesLen, setMyMatchesLen] = useState(0)
  const [page, setPage] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false)
  const [matchesIds, setMatchesIds] = useState<number[]>([])
  const [matches, setMatches] = useState<Match[]>([])

  const { isLoading, data } = useQuery(
    ["matches_by_ids", matchesIds],
    fetcherMatchesByIds(sport, matchesIds),
    {
      enabled: !!sport && !!myMatchesLen && !!matchesLen,
    }
  )

  // TODO return
  // const updateBets = ({
  //   id,
  //   matchId,
  //   amount,
  //   market,
  //   user,
  // }: {
  //   id: Big
  //   matchId: Big
  //   amount: Big
  //   market: string
  //   user: string
  // }) => {
  //   setIsLoading(true)
  //   setMatches((prevState) =>
  //     prevState
  //       ? {
  //           ...prevState,
  //           pages: prevState?.pages.map((page) => ({
  //             ...page,
  //             data: page.data.map((match) => {
  //               if (Number(match.id) === matchId.toNumber()) {
  //                 if (!match.matchFromSmart) return match
  //                 const alreadyBet = match.matchFromSmart.bets.some((bet) =>
  //                   new Big(bet.id).eq(id)
  //                 )

  //                 if (alreadyBet) return match
  //                 const newBets = [
  //                   ...match.matchFromSmart.bets,
  //                   {
  //                     id,
  //                     user,
  //                     market,
  //                     amount,
  //                     createdAt: Date.now(),
  //                   },
  //                 ]

  //                 return {
  //                   ...match,
  //                   matchFromSmart: {
  //                     ...match.matchFromSmart,
  //                     bets: newBets,
  //                   },
  //                 }
  //               }
  //               return match
  //             }),
  //           })),
  //         }
  //       : null
  //   )
  //   setIsLoading(false)
  // }

  // useEffect(() => {
  //   if (contractState !== "connected") return
  //   if (!isSuccess) return
  //   ;(async () => {
  //     const mLen = await getMatchesLength()
  //     if (!mLen) return
  //     setIsLoading(true)

  //     const copyData = { ...data } as {
  //       pages: {
  //         data: MatchWithSmart[]
  //         nextPage: number
  //         isLastPage: boolean
  //       }[]
  //       pageParams: unknown[]
  //     }

  //     for (const page of copyData.pages) {
  //       const matchesIds = page.data.map((item) => Number(item.id))
  //       const matchesSmartContract = await getMatchesByIds(matchesIds)
  //       for (const match of page.data) {
  //         const matchFind = matchesSmartContract.find(
  //           (item) => Number(item.id) === Number(match.id)
  //         )
  //         if (!matchFind) {
  //           match.matchFromSmart = null
  //         }

  //         match.matchFromSmart = matchFind
  //       }
  //     }

  //     setIsLoading(false)
  //     setMatches(copyData)
  //   })()
  // }, [data, contractState, isSuccess])

  // useEffect(() => {
  //   if (!matches) return
  //   if (contractState !== "connected") return
  //   if (isSubscribe) return
  //   // subscribeEvent("AddBet", updateBets)
  //   setIsSubscribe(true)
  // }, [matches, contractState])

  const fetchNextPage = () => {
    setPage((prevState) => ++prevState)
  }

  useEffect(() => {
    if (contractState !== "connected") return
    if (!matchesLen) return
    ;(async () => {
      const myMatches = await getMatchesByUser()
      setMyMatchesLen(myMatches?.length || 0)
      if (!myMatches || !myMatches.length) return

      const myMatchesIds = myMatches.map((id) => id.toNumber()).reverse()
      const myMatchesIdsSet = new Set(myMatchesIds)

      if (page > Math.ceil(myMatchesIdsSet.size / 10)) {
        setIsLastPage(true)
        return
      }

      const ids = myMatchesIds.splice(
        (page - 1) * 10,
        Math.min(10, myMatchesIdsSet.size) * page
      )
      setMatchesIds(ids)
    })()
  }, [contractState, matchesLen, page])

  useEffect(() => {
    if (!data) return

    setMatches((prevState) => [...prevState, ...data.data])
  }, [data])

  useEffect(() => {
    if (contractState !== "connected") return
    ;(async () => {
      const mLen = await getMatchesLength()
      if (!mLen) return
      setMatchesLen(mLen)
    })()
  }, [contractState])

  return {
    myMatchesLen,
    matchesLen,
    isLoading:
      !!sport && !!myMatchesLen && !!matchesLen
        ? isLoading
        : !!myMatchesLen && !!matchesLen,
    matches,
    isLastPage,
    fetchNextPage,
  }
}
