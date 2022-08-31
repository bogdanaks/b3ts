import { useMatches } from "entities/match/model/use-matches"
import { MatchList } from "entities/match/ui/match-list"
import { MatchListByPage } from "entities/match/ui/match-list-by-page"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { Layout } from "shared/ui/layout"
import Tabs from "shared/ui/tabs"
import { Wrapper } from "shared/ui/wrapper"
import { Header } from "widgets/header"
import { SportsBar } from "widgets/sports-bar"

const SpotPage = () => {
  const { query } = useRouter()
  const { sport } = query
  const { matches, isLoading, fetchNextPage, isLastPage } = useMatches(
    String(sport)
  )

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
              <MatchListByPage
                matches={matches}
                isLoading={isLoading}
                fetchNextPage={fetchNextPage}
              />
            }
          />
          <></>
        </Tabs>
      </Wrapper>
    </Layout>
  )
}

export default SpotPage
