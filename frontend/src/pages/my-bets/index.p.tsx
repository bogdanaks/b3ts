import { MyMatches } from "entities/match/ui/my-matches"
import React from "react"
import { Layout } from "shared/ui/layout"
import Tabs from "shared/ui/tabs"
import { Wrapper } from "shared/ui/wrapper"
import { Header } from "widgets/header"
import { SportsBar } from "widgets/sports-bar"

const MyBets = () => {
  return (
    <Layout>
      <Header />
      <Wrapper>
        <SportsBar rootRoute="my-bets" activeLink={1} />
        <Tabs style={{ marginTop: 20 }}>
          <Tabs.Tab title="Matches" body={<MyMatches sport="football" />} />
          <></>
        </Tabs>
      </Wrapper>
    </Layout>
  )
}

export default MyBets
