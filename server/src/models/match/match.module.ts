import { Module } from "@nestjs/common"
import { DatabaseModule } from "src/providers/database/database.module"
import { entitiesProviders } from "src/providers/database/entities.providers"

import { MatchController } from "./match.controller"
import { MatchService } from "./match.service"

@Module({
  imports: [DatabaseModule, MatchModule],
  controllers: [MatchController],
  providers: [MatchService, ...entitiesProviders]
})
export class MatchModule {}
