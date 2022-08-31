import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { In, Repository } from "typeorm"

import { Match, MatchStatus } from "./entities/match.entity"

@Injectable()
export class MatchService {
  constructor(
    @Inject("MATCH_REPOSITORY")
    private matchRepository: Repository<Match>
  ) {}

  count({
    status,
    sport,
    matchesIds
  }: {
    status: MatchStatus
    sport?: string
    matchesIds?: number[]
  }): Promise<number> {
    return this.matchRepository.count({
      where: { status, sport: { slug: sport }, sc_id: In(matchesIds) }
    })
  }

  findAll({
    status,
    sport,
    matchesIds,
    limit,
    page
  }: {
    status: MatchStatus
    sport?: string
    matchesIds?: number[]
    limit?: number
    page?: number
  }): Promise<Match[]> {
    return this.matchRepository.find({
      where: { status, sport: { slug: sport }, sc_id: In(matchesIds) },
      relations: ["sport"],
      take: limit,
      skip: limit * page - limit,
      order: {
        start_at: "DESC"
      }
    })
  }

  findOne(id: string): Promise<Match> {
    return this.matchRepository.findOne({
      where: { id },
      relations: ["sport"]
    })
  }

  async createMatch({
    sc_id,
    status,
    title,
    sport_id,
    markets,
    start_at
  }: {
    sc_id: number
    title: string
    sport_id: string
    status: number
    markets: string
    start_at: number
  }): Promise<Match> {
    const findMatch = await this.findOne(String(sc_id))
    if (findMatch) {
      throw new BadRequestException("Already created")
    }

    const statusString = await this.getStatusByNumber(status)
    return await this.matchRepository.save({
      sc_id: String(sc_id),
      title,
      sport_id,
      markets: JSON.parse(markets),
      status: statusString,
      start_at: new Date(start_at)
    })
  }

  protected getStatusByNumber(statusNum: number): MatchStatus | undefined {
    const statuses = {
      1: MatchStatus.CREATED,
      2: MatchStatus.FINISHED,
      3: MatchStatus.CANCELED
    }

    return statuses[statusNum] || undefined
  }
}
