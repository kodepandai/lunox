import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QueueJobSchema } from "../../../../src/contracts";
@Entity(
  "queue_jobs"
)
class QueueJobMysql implements QueueJobSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  queue!: string;

  @Column("mediumblob")
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
export default QueueJobMysql;
