import { QueueJobFailedSchema } from "@lunoxjs/event/contracts";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(
  "queue_failed_jobs",
)
class QueueJobFailed implements QueueJobFailedSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  queue!: string;

  @Column("bytea")
  payload!: Buffer;

  @Column("text")
  exception!: string;

  @Column("timestamptz", { nullable: true })
  failed_at?: Date;
}
export default QueueJobFailed;
