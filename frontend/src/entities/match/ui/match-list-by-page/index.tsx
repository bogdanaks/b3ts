import { InfiniteData } from "@tanstack/react-query"
import React from "react"
import { MatchItem } from "../match-item"
import { SkeletonMatch } from "../skeleton"

export const MatchListByPage = ({
  matches,
  isLoading,
}: {
  matches:
    | InfiniteData<{
        data: Match[]
        nextPage: number
        isLastPage: boolean
      }>
    | undefined
  isLoading: boolean
}) => {
  return (
    <ul>
      {matches?.pages.map((page, indexPage) =>
        page.data.map((match, indexMatch) => (
          <MatchItem key={`${indexPage}_${indexMatch}}`} match={match} />
        ))
      )}
      {isLoading && <SkeletonMatch count={6} />}
    </ul>
  )
}
