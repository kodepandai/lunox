import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @Column("int", { nullable: true })
  reserved_at?: Date;

  @Column("int", { nullable: true })
  available_at?: Date;

  @CreateDateColumn({ type: "int" })
  created_at?: Date;
}
export default QueueJob;
