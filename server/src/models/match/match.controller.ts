import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe
} from "@nestjs/common"

import { NewMatchDto } from "./dto/new-match.dto"
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
    @Query("matchesLen") matchesLen: number,
    @Query("page") page = 1
  ): Promise<{ data: Match[]; limit: number; page: number; total: number }> {
    const count = await this.matchService.count({ status, sport })
    const matches = await this.matchService.findAll({
      status,
      sport,
      matchesLen,
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

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Match> {
    return this.matchService.findOne(id)
  }

  @Post()
  createMatch(
    @Body(new ValidationPipe()) newMatch: NewMatchDto
  ): Promise<Match> {
    return this.matchService.createMatch({
      sc_id: newMatch.sc_id,
      title: newMatch.title,
      sport_id: newMatch.sport_id,
      markets: newMatch.markets,
      status: newMatch.status,
      start_at: newMatch.start_at
    })
  }
}
