import React from "react"
import { Layout } from "shared/ui/layout"
import { Wrapper } from "shared/ui/wrapper"
import { Header } from "widgets/header"

const MyBets = () => {
  return (
    <Layout>
      <Header />
      <Wrapper>
        <h1>My bets</h1>
      </Wrapper>
    </Layout>
  )
}

export default MyBets
