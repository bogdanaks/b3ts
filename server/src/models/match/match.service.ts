import { Inject, Injectable } from "@nestjs/common"
import { Repository } from "typeorm"

import { Match, MatchStatus } from "./entities/match.entity"

@Injectable()
export class MatchService {
  constructor(
    @Inject("MATCH_REPOSITORY")
    private matchRepository: Repository<Match>
  ) {}

  count({
    status,
    sport
  }: {
    status: MatchStatus
    sport?: string
  }): Promise<number> {
    return this.matchRepository.count({
      where: { status, sport: { slug: sport } }
    })
  }

  findAll({
    status,
    sport,
    limit,
    page
  }: {
    status: MatchStatus
    sport?: string
    limit?: number
    page?: number
  }): Promise<Match[]> {
    return this.matchRepository.find({
      where: { status, sport: { slug: sport } },
      relations: ["sport"],
      take: limit,
      skip: limit * page - limit
    })
  }
}
