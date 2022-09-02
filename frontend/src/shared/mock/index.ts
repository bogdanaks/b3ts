import { Bets } from "app/Bets"
import Big from "big.js"
import { BigNumber } from "ethers"

export const mockMatches = [
  {
    id: 1,
    sc_id: 1,
    title: "Test1 vs Test2",
    markets: {
      TEAM: ["TEAM_1", "DRAFT", "TEAM_2"],
    },
    status: "CREATED",
    sport_id: "3",
    start_at: new Date(),
    finish_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
    sport: {
      id: "3",
      slug: "football",
      title: "Football",
      created_at: new Date(),
      updated_at: new Date(),
    },
  },
  {
    id: 2,
    sc_id: 2,
    title: "Test3 vs Test3",
    markets: {
      TEAM: ["TEAM_1", "TEAM_2"],
    },
    status: "CREATED",
    sport_id: "3",
    start_at: new Date(),
    finish_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
    sport: {
      id: "3",
      slug: "football",
      title: "Football",
      created_at: new Date(),
      updated_at: new Date(),
    },
  },
] as Match[]

export const totalByMarketMock = {
  "TEAM_1": {
    totalCount: 1,
    myCount: 1,
    totalAmount: 1,
    myAmount: 1,
    percent: 5,
  },
  "TEAM_2": {
    totalCount: 1,
    myCount: 0,
    totalAmount: 0,
    myAmount: 0,
    percent: 5,
  },
  "DRAFT": {
    totalCount: 1,
    myCount: 0,
    totalAmount: 0,
    myAmount: 0,
    percent: 5,
  },
}

export const betsMock: Bets.BetStructOutput[] = [
  {
    id: BigNumber.from(1),
    user: "0x123123123",
    market: "TEAM_1",
    amount: BigNumber.from(10e10),
    createdAt: BigNumber.from(1234564),
    "0": BigNumber.from(1),
    "1":"0x123123123",
    "2": "TEAM_1",
    "3": BigNumber.from(10e10),
    "4": BigNumber.from(1234564),
  },
  {
    id: BigNumber.from(2),
    user: "0x123123123",
    market: "TEAM_1",
    amount: BigNumber.from(10e10),
    createdAt: BigNumber.from(1234564),
    "0": BigNumber.from(2),
    "1":"0x123123123",
    "2": "TEAM_1",
    "3": BigNumber.from(10e10),
    "4": BigNumber.from(1234564),
  },
] as Bets.BetStructOutput[]