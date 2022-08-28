import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

import { Sport } from "./sport.entiy"

export enum MatchStatus {
  CREATED = "CREATED",
  RUNNING = "RUNNING",
  FINISHED = "FINISHED",
  CANCELED = "CANCELED"
}

type Market = {
  [key: string]: string[]
}

@Entity({ name: "matches" })
export class Match {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  sc_id: string

  @Column({ length: 200 })
  title: string

  @Column({
    type: "json"
  })
  markets: Market

  @Column({
    type: "enum",
    enum: MatchStatus,
    default: MatchStatus.CREATED
  })
  status: MatchStatus

  @Column()
  sport_id: string

  @OneToOne(() => Sport)
  @JoinColumn({ name: "sport_id" })
  sport: Sport

  @CreateDateColumn()
  start_at: Date

  @CreateDateColumn()
  finish_at: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
