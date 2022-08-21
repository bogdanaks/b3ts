import { Matches } from "entities/match/ui/matches"
import { useRouter } from "next/router"
import React from "react"
import { Layout } from "shared/ui/layout"
import Tabs from "shared/ui/tabs"
import { Wrapper } from "shared/ui/wrapper"
import { Header } from "widgets/header"
import { SportsBar } from "widgets/sports-bar"

const SpotPage = () => {
  const { query } = useRouter()
  const { sport } = query
  if (!sport) return
  return (
    <Layout>
      <Header />
      <Wrapper>
        <SportsBar />
        <Tabs style={{ marginTop: 20 }}>
          <Tabs.Tab title="Matches" body={<Matches sport={String(sport)} />} />
          <></>
        </Tabs>
      </Wrapper>
    </Layout>
  )
}

export default SpotPage
