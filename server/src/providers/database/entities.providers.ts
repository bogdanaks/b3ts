import { Match } from "src/models/match/entities/match.entity"
import { Sport } from "src/models/match/entities/sport.entiy"
import { DataSource } from "typeorm"

export const entitiesProviders = [
  {
    provide: "MATCH_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Match),
    inject: ["DATA_SOURCE"]
  },
  {
    provide: "SPORT_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Sport),
    inject: ["DATA_SOURCE"]
  }
]
