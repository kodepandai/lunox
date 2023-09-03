import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(
  config("queue.connections")[config("queue.defaultConnection")].table +
  "_failed",
)
class QueueJobFailedPg {
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
export default QueueJobFailedPg;
