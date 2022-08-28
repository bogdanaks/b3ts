import { CreateMatch } from "features/create-match/ui"
import React from "react"
import { Layout } from "shared/ui/layout"
import Tabs from "shared/ui/tabs"
import { Wrapper } from "shared/ui/wrapper"
import { Header } from "widgets/header"

const AdminPage = () => {
  return (
    <Layout>
      <Header />
      <Wrapper>
        <Tabs style={{ marginTop: 20 }}>
          <Tabs.Tab title="Create" body={<CreateMatch />} />
          <></>
        </Tabs>
      </Wrapper>
    </Layout>
  )
}

export default AdminPage
