import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { MatchModule } from "../match/match.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"

@Module({
  imports: [ConfigModule.forRoot(), MatchModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
