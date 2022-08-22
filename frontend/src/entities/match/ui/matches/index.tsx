import { useMatches } from "entities/match/model/use-matches"
import React, { FC } from "react"
import { useScrollToBottom } from "shared/hooks/use-scroll-to-bottom"
import { MatchItem } from "../match-item"
import { SkeletonMatch } from "../skeleton"

import styles from "./styles.module.scss"

interface MatchesProps {
  sport: string
}

export const Matches: FC<MatchesProps> = ({ sport }) => {
  const { matches, isLastPage, fetchNextPage, isLoading } = useMatches(sport)
  useScrollToBottom(isLastPage, fetchNextPage)

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
