import { IsNumber, IsString } from "class-validator"

export class NewMatchDto {
  @IsString()
  title: string

  @IsString()
  sport_id: string

  @IsNumber()
  sc_id: number

  @IsNumber()
  status: number

  @IsString()
  markets: string

  @IsNumber()
  start_at: number
}
