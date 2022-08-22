import { MyMatches } from "entities/match/ui/my-matches"
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
  return (
    <Layout>
      <Header />
      <Wrapper>
        <SportsBar rootRoute="my-bets" />
        <Tabs style={{ marginTop: 20 }}>
          <Tabs.Tab
            title="Matches"
            body={<MyMatches sport={String(sport)} />}
          />
          <></>
        </Tabs>
      </Wrapper>
    </Layout>
  )
}

export default MyBets
