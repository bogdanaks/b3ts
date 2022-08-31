import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { MatchItem } from "../match-item"
import { SkeletonMatch } from "../skeleton"

interface MatchListByPageProps {
  matches: Match[]
  isLoading: boolean
  fetchNextPage: () => void
}

export const MatchListByPage = ({
  matches,
  isLoading,
  fetchNextPage,
}: MatchListByPageProps) => {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (!inView) return
    fetchNextPage()
  }, [inView])

  return (
    <ul>
      {!isLoading && !matches.length && <h4>Not yet</h4>}
      {matches.map((match, index) => (
        <MatchItem key={index} match={match} />
      ))}
      <div ref={ref} />
      {isLoading && <SkeletonMatch count={6} />}
    </ul>
  )
}
