import { useMyMatches } from "entities/match/model/use-my-matches"
import { MatchListByPage } from "entities/match/ui/match-list-by-page"
import React from "react"
import { Layout } from "shared/ui/layout"
import Tabs from "shared/ui/tabs"
import { Wrapper } from "shared/ui/wrapper"
import { Header } from "widgets/header"
import { SportsBar } from "widgets/sports-bar"

const MyBets = () => {
  const { matches, isLoading, fetchNextPage } = useMyMatches("football")

  return (
    <Layout>
      <Header />
      <Wrapper>
        <SportsBar rootRoute="my-bets" activeLink={1} />
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

export default MyBets
