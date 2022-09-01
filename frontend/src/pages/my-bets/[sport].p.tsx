import { matchModel, MatchSkeleton } from "entities/match"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Layout } from "shared/ui/layout"
import Tabs from "shared/ui/tabs"
import { Wrapper } from "shared/ui/wrapper"
import { Header } from "widgets/header"
import { MatchCard } from "widgets/match/ui"
import { SportsBar } from "widgets/sports-bar"

const MyBets = () => {
  const { query } = useRouter()
  const { sport } = query

  const {
    matches,
    isLoading,
    fetchNextPage,
    myMatchesLen,
    matchesLen,
    isLastPage,
  } = matchModel.useMyMatches(String(sport))
  const { inView, ref } = useInView()

  useEffect(() => {
    if (!inView) return
    fetchNextPage()
  }, [inView])

  return (
    <Layout>
      <Header />
      <Wrapper>
        <SportsBar rootRoute="my-bets" />
        <Tabs style={{ marginTop: 20 }}>
          <Tabs.Tab
            title="Matches"
            body={
              <ul>
                {!isLoading && !myMatchesLen && <h4>Not yet</h4>}
                {matches.map((match, index) => (
                  <MatchCard key={index} match={match} />
                ))}
                {isLoading && !!myMatchesLen && !!matchesLen && (
                  <MatchSkeleton count={6} />
                )}
                {!!matches.length && !isLoading && !isLastPage && (
                  <div ref={ref} />
                )}
              </ul>
            }
          />
          <></>
        </Tabs>
      </Wrapper>
    </Layout>
  )
}

export default MyBets
