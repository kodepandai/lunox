import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(
  "queue_failed_jobs"
)
class QueueJobFailedSqlite {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  queue!: string;

  @Column("blob")
  payload!: Buffer;

  @Column("text")
  exception!: string;

  @Column("datetime", { nullable: true })
  failed_at?: Date;
}
export default QueueJobFailedSqlite;
