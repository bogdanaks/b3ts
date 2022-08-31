import { InfiniteData } from "@tanstack/react-query";

const matches = [
  {
    id: 1,
    title: "Test1 vs Test2",
    markets: {
      "TEAM": ["TEAM_1", "TEAM_2"],
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
    }
  },
  {
    id: 2,
    title: "Test3 vs Test3",
    markets: {
      "TEAM": ["TEAM_1", "TEAM_2"],
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
    }
  }
] as Match[]

export const mockMatches = {
  pages: [
    { data: matches },
  ],
  nextPage: 1,
  isLastPage: true,
} as unknown as InfiniteData<{
  data: Match[];
  nextPage: number;
  isLastPage: boolean;
}>