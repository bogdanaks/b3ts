import { VersioningType } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"

import { AppModule } from "./models/app/app.module"

const PORT = process.env.PORT || 5000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: "*" // TODO FIX
  })

  app.enableVersioning({
    type: VersioningType.URI
  })
  app.setGlobalPrefix("api")

  await app.listen(PORT)
}
bootstrap()
