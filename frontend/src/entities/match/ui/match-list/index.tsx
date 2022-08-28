import React from "react"
import { MatchItem } from "../match-item"

export const MatchList = ({ matches }: { matches: Match[] }) => {
  return (
    <ul>
      {matches.map((match, index) => (
        <MatchItem key={index} match={match} />
      ))}
    </ul>
  )
}
