import React, { useEffect, useState } from "react"
import { useMyContract } from "shared/hooks/use-my-contract"
import { Button } from "shared/ui/button"
import { Wrapper } from "shared/ui/wrapper"
import { useQuery } from "@tanstack/react-query"
import { Header } from "widgets/header"
import { fetcherMatches } from "shared/api"

import styles from "./styles.module.scss"

const AdminPage = () => {
  const { data, isLoading, isSuccess } = useQuery(["matches"], fetcherMatches())
  const { createMatch, getMatchesByIds, contractState } = useMyContract()
  const [matchesWithSmart, setMatchesWithSmart] = useState<MatchWithSmart[]>([])

  const handleCreateMatch = async (match: MatchWithSmart) => {
    if (contractState !== "connected") return
    await createMatch(Number(match.id), [["WIN_1", "WIN_2"]])
  }

  useEffect(() => {
    if (!data) return
    if (contractState !== "connected") return
    ;(async () => {
      const matchesWithSmart = [] as MatchWithSmart[]
      const matchesIds = data.map((item) => Number(item.id))
      const matchesSmartContract = await getMatchesByIds(matchesIds)

      for (const match of data) {
        const matchFind = matchesSmartContract.find(
          (item) => Number(item.id) === Number(match.id)
        )

        matchesWithSmart.push({ ...match, matchFromSmart: matchFind || null })
      }
      setMatchesWithSmart(matchesWithSmart)
    })()
  }, [data, contractState])

  return (
    <div>
      <Header />
      <Wrapper>
        <ul className={styles.matches}>
          {isSuccess &&
            matchesWithSmart.map((match) => (
              <li key={match.id} className={styles.matchesItem}>
                <div className={styles.matchesItemInfo}>
                  <span className={styles.matchesItemInfoTitle}>
                    {match.title}
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
            ))}
        </ul>
      </Wrapper>
    </div>
  )
}

export default AdminPage
