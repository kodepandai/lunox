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
class QueueJobPg implements QueueJobSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  queue!: string;

  @Column("bytea")
  payload!: Buffer;

  @Column("int", { default: 0 })
  attempts!: number;

  @Column("timestamptz", { nullable: true })
  reserved_at?: Date;

  @Column("timestamptz", { nullable: true })
  available_at?: Date;

  @CreateDateColumn({ type: "timestamptz" })
  created_at?: Date;
}
export default QueueJobPg;
