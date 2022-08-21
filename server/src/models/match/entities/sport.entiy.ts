import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

@Entity({ name: "sports" })
export class Sport {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ length: 50 })
  slug: string

  @Column({ length: 200 })
  title: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
