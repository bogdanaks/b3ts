import React from "react"
import { Wrapper } from "shared/ui/wrapper"
import { SportsBar } from "widgets/sports-bar"
import { Header } from "widgets/header"

const HomePage = () => {
  return (
    <div>
      <Header />
      <Wrapper>
        <SportsBar />
      </Wrapper>
    </div>
  )
}

export default HomePage
