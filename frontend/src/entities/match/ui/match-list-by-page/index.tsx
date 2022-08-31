import { InfiniteData } from "@tanstack/react-query"
import React from "react"
import { MatchItem } from "../match-item"
import { SkeletonMatch } from "../skeleton"

interface MatchListByPageProps {
  matches:
    | InfiniteData<{
        data: Match[]
        nextPage: number
        isLastPage: boolean
      }>
    | undefined
  isLoading: boolean
  matchesLen: number
}

export const MatchListByPage = ({
  matches,
  isLoading,
  matchesLen,
}: MatchListByPageProps) => {
  return (
    <ul>
      {isLoading && !Boolean(matches?.pages.length) && <h4>Not yet</h4>}
      {matches?.pages.map((page, indexPage) =>
        page.data.map((match, indexMatch) => (
          <MatchItem key={`${indexPage}_${indexMatch}}`} match={match} />
        ))
      )}
      {isLoading && Boolean(matchesLen) && <SkeletonMatch count={6} />}
    </ul>
  )
}
