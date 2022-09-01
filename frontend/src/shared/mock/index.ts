export const mockMatches = [
  {
    id: 1,
    sc_id: 1,
    title: "Test1 vs Test2",
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
