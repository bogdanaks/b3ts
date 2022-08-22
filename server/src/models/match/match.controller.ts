import { Controller, Get, Query } from "@nestjs/common"

import { Match, MatchStatus } from "./entities/match.entity"
import { MatchService } from "./match.service"

@Controller({
  version: "1",
  path: "match"
})
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get("/")
  async findAll(
    @Query("status") status: MatchStatus,
    @Query("sport") sport: string,
    @Query("limit") limit = 10,
    @Query("page") page = 1
  ): Promise<{ data: Match[]; limit: number; page: number; total: number }> {
    const count = await this.matchService.count({ status, sport })
    const matches = await this.matchService.findAll({
      status,
      sport,
      limit,
      page
    })
    return {
      data: matches,
      limit: Number(limit),
      page: Number(page),
      total: Number(count)
    }
  }
}
