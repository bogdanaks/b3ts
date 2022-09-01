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

const SpotPage = () => {
  const { query } = useRouter()
  const { sport } = query
  const { matches, isLoading, fetchNextPage, isLastPage } =
    matchModel.useMatches(String(sport))
  const { inView, ref } = useInView()

  useEffect(() => {
    if (!inView) return
    fetchNextPage()
  }, [inView])

  if (!sport) return
  return (
    <Layout>
      <Header />
      <Wrapper>
        <SportsBar rootRoute="sports" />
        <Tabs style={{ marginTop: 20 }}>
          <Tabs.Tab
            title="Matches"
            body={
              <ul>
                {!isLoading && !matches.length && <h4>Not yet</h4>}
                {matches.map((match, index) => (
                  <MatchCard key={index} match={match} />
                ))}
                {isLoading && <MatchSkeleton count={6} />}
                {!isLastPage && !isLoading && <div ref={ref} />}
              </ul>
            }
          />
          <></>
        </Tabs>
      </Wrapper>
    </Layout>
  )
}

export default SpotPage
