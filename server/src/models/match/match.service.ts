import { Inject, Injectable } from "@nestjs/common"
import { Repository } from "typeorm"

import { Match, MatchStatus } from "./entities/match.entity"

@Injectable()
export class MatchService {
  constructor(
    @Inject("MATCH_REPOSITORY")
    private matchRepository: Repository<Match>
  ) {}

  findAll({
    status,
    sport
  }: {
    status: MatchStatus
    sport?: string
  }): Promise<Match[]> {
    return this.matchRepository.find({
      where: { status, sport: { slug: sport } },
      relations: ["sport"]
    })
  }
}
