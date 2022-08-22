import { useMyMatches } from "entities/match/model/use-my-matches"
import React from "react"
import { useScrollToBottom } from "shared/hooks/use-scroll-to-bottom"
import { MatchItem } from "../match-item"
import { SkeletonMatch } from "../skeleton"

import styles from "./styles.module.scss"

interface MatchesProps {
  sport: string
}

export const MyMatches = ({ sport }: MatchesProps) => {
  const { matches, isLoading } = useMyMatches(sport)
  // useScrollToBottom(isLastPage, fetchNextPage)

  return (
    <ul className={styles.list}>
      {matches &&
        matches.pages.map((page) =>
          page.data.map((match, index) => (
            <MatchItem key={index} match={match} />
          ))
        )}
      {isLoading && <SkeletonMatch count={6} />}
    </ul>
  )
}
