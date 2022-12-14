type ContractEvents = "AddBet" | "CreateMatch" | "UpdateMatch"

type MatchStatus = "CREATED" | "RUNNING" | "FINISHED" | "CANCELED"

type Match = {
  id: number
  sc_id: number
  title: string
  markets: {
    [key: string]: string[]
  }
  status: MatchStatus
  sport_id: string
  start_at: Date
  finish_at: Date | null
  created_at: Date
  updated_at: Date
  sport: {
    id: string
    slug: string
    title: string
    created_at: Date
    updated_at: Date
  }
}

interface MatchWithSmart extends Match {
  matchFromSmart: MatchStruct | null
}

interface ResponseData<T> {
  data: T
  limit: number
  page: number
  total: number
}
