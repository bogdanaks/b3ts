import { useMatches } from "entities/match/model/use-matches"
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
  const { matches, isLoading, isLastPage, fetchNextPage, matchesLen } =
    useMatches(String(sport))

  const handleScroll = () => {
    const userScrollHeight = window.innerHeight + window.scrollY
    const windowBottomHeight = document.documentElement.offsetHeight

    if (userScrollHeight + 2 >= windowBottomHeight) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    if (isLastPage) return
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isLastPage])

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
                matchesLen={matchesLen}
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
