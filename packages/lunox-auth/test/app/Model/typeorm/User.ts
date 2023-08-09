import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { unique: true })
  email!: string;

  @Column("varchar", { select: false })
  password!: string;
}
export default User;
