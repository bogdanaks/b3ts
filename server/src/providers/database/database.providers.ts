import { ConfigService } from "@nestjs/config"
import { Match } from "src/models/match/entities/match.entity"
import { Sport } from "src/models/match/entities/sport.entiy"
import { DataSource } from "typeorm"

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: "postgres",
        host: configService.get("PG_HOST"),
        port: configService.get("PG_PORT"),
        username: configService.get("PG_USER"),
        password: configService.get("PG_PASSWORD"),
        database: configService.get("PG_DATABASE"),
        entities: [Match, Sport],
        synchronize: false
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      })
      return dataSource.initialize()
    },
    inject: [ConfigService]
  }
]
