import { Traitable } from "@lunoxjs/core";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Authenticatable } from "../../../../contracts";
import AuthenticatableTrait from "../../../../src/providers/typeorm/AuthenticatableTrait";

interface User extends Authenticatable { }

@Entity("users")
class User extends Traitable(class { }).use(AuthenticatableTrait) {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { unique: true })
  email!: string;

  @Column("varchar", { select: false })
  password!: string;

  @Column("text", { nullable: true })
  remember_token!: string;
}
export default User;
