import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { QueueJobSchema } from "../../contracts/model";
@Entity(
  config?.("queue.connections")[config?.("queue.defaultConnection")].table,
)
class QueueJobSqlite implements QueueJobSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  queue!: string;

  @Column("blob")
  payload!: Buffer;

  @Column("tinyint", { default: 0 })
  attempts!: number;

  @Column("datetime", { nullable: true })
  reserved_at?: Date;

  @Column("datetime", { nullable: true })
  available_at?: Date;

  @CreateDateColumn()
  created_at?: Date;
}
export default QueueJobSqlite;
