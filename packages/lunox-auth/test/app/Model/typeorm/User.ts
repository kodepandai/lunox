import { Traitable } from "@lunoxjs/core";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuthenticatableTrait } from "../../../../src";
import { Authenticatable } from "../../../../contracts";

interface User extends Authenticatable {}

@Entity("users")
class User extends Traitable().use(AuthenticatableTrait) {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { unique: true })
  email!: string;

  @Column("varchar", { select: false })
  password!: string;
}
export default User;
