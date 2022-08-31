import { useMyMatches } from "entities/match/model/use-my-matches"
import { MatchListByPage } from "entities/match/ui/match-list-by-page"
import { useRouter } from "next/router"
import React from "react"
import { Layout } from "shared/ui/layout"
import Tabs from "shared/ui/tabs"
import { Wrapper } from "shared/ui/wrapper"
import { Header } from "widgets/header"
import { SportsBar } from "widgets/sports-bar"

const MyBets = () => {
  const { query } = useRouter()
  const { sport } = query

  const { matches, isLoading, fetchNextPage } = useMyMatches(String(sport))

  return (
    <Layout>
      <Header />
      <Wrapper>
        <SportsBar rootRoute="my-bets" />
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
