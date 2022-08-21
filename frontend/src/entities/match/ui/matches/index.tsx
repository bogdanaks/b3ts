import { useMatches } from "entities/match/model"
import React, { FC } from "react"
import { MatchItem } from "../match-item"

import styles from "./styles.module.scss"

interface MatchesProps {
  sport: string
}

export const Matches: FC<MatchesProps> = ({ sport }) => {
  const { matches } = useMatches(sport)

  return (
    <ul className={styles.list}>
      {!!matches.length &&
        matches.map((match, index) => <MatchItem key={index} match={match} />)}
    </ul>
  )
}
