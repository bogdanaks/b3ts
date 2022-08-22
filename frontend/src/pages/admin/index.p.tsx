import React, { useEffect, useState } from "react"
import { useMyContract } from "shared/hooks/use-my-contract"
import { Button } from "shared/ui/button"
import { Wrapper } from "shared/ui/wrapper"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { Header } from "widgets/header"
import { fetcherMatches } from "shared/api"

import styles from "./styles.module.scss"

const AdminPage = () => {
  // const { data, isSuccess } = useQuery(["matches"], fetcherMatches())
  const { isSuccess, data, fetchNextPage } = useInfiniteQuery(
    ["matches"],
    async ({ pageParam = 1 }) => {
      const limit = 15
      const res = await fetcherMatches()()

      return {
        data: res.data,
        nextPage: Number(res.page) + 1,
        isLastPage: Math.ceil(res.total / limit) === pageParam,
      }
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    }
  )
  const { createMatch, getMatchesByIds, contractState } = useMyContract()
  const [matchesWithSmart, setMatchesWithSmart] = useState<{
    pages: {
      data: MatchWithSmart[]
      nextPage: number
      isLastPage: boolean
    }[]
    pageParams: unknown[]
  } | null>(null)

  const handleCreateMatch = async (match: MatchWithSmart) => {
    if (contractState !== "connected") return
    await createMatch(Number(match.id), [["WIN_1", "WIN_2"]])
  }

  useEffect(() => {
    if (!data) return
    if (contractState !== "connected") return
    ;(async () => {
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

          match.matchFromSmart = matchFind || null
        }
      }

      setMatchesWithSmart(copyData)
    })()
  }, [data, contractState])

  return (
    <div>
      <Header />
      <Wrapper>
        <ul className={styles.matches}>
          {isSuccess &&
            matchesWithSmart &&
            matchesWithSmart.pages.map((page) =>
              page.data.map((match) => (
                <li key={match.id} className={styles.matchesItem}>
                  <div className={styles.matchesItemInfo}>
                    <span className={styles.matchesItemInfoTitle}>
                      {match.id} {match.title}
                    </span>
                    <span className={styles.matchesItemInfoStatus}>
                      {match.status}
                    </span>
                  </div>
                  {!match.matchFromSmart && (
                    <Button
                      onClick={() => handleCreateMatch(match)}
                      className={styles.matchesItemBtn}
                    >
                      Create match in blockchain
                    </Button>
                  )}
                </li>
              ))
            )}
        </ul>
      </Wrapper>
    </div>
  )
}

export default AdminPage
