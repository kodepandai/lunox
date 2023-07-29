import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(
  config("queue.connections")[config("queue.defaultConnection")].table +
  "_failed",
)
class QueueJobFailed {
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
export default QueueJobFailed;
