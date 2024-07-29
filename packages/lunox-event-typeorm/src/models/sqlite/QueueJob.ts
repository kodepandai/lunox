import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QueueJobSchema } from "@lunoxjs/event/contracts";
@Entity(
  "queue_jobs",
  {
    engine: "INNODB",
  }
)
class QueueJob implements QueueJobSchema {
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
export default QueueJob;
