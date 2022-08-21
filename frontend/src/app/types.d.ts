type ContractEvents = "AddBet" | "CreateMatch" | "UpdateMatch"

type BetStruct = {
  id: Big
  user: string
  market: string
  amount: Big
  createdAt: Big
}

type MatchStruct = {
  id: PromiseOrValue<number>
  status: PromiseOrValue<BigNumberish>
  wonMarkets: PromiseOrValue<string>[]
  markets: PromiseOrValue<string>[][]
  bets: BetStruct[]
  createdAt: PromiseOrValue<BigNumberish>
}

type MatchStatus = "CREATED" | "RUNNING" | "FINISHED" | "CANCELED"

type Match = {
  id: number
  title: string
  markets: {
    [key: string]: string[]
  }
  status: MatchStatus
  sport_id: string
  start_at: Date | null
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
