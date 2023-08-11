import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(
  config?.("queue.connections")[config?.("queue.defaultConnection")].table,
)
class QueueJob {
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

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at?: Date;
}
export default QueueJob;
