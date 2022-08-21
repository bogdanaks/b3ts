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
  findAll(
    @Query("status") status: MatchStatus,
    @Query("sport") sport: string
  ): Promise<Match[]> {
    return this.matchService.findAll({ status, sport })
  }
}
