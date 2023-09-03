import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(
  config("queue.connections")[config("queue.defaultConnection")].table +
  "_failed",
)
class QueueJobFailedMysql {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  queue!: string;

  @Column("mediumblob")
  payload!: Buffer;

  @Column("text")
  exception!: string;

  @Column("datetime", { nullable: true })
  failed_at?: Date;
}
export default QueueJobFailedMysql;
