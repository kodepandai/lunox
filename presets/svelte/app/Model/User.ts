import { Traitable } from "@lunoxjs/core";
import { AuthenticatableTrait } from "@lunoxjs/auth/typeorm";
import type { Authenticatable } from "@lunoxjs/auth/contracts";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

interface User extends Authenticatable { }
@Entity("users")
class User extends Traitable(class { }).use(AuthenticatableTrait) {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  user_name!: string;

  @Column("varchar", { unique: true })
  email!: string;

  @Column("varchar")
  first_name!: string;

  @Column("varchar")
  last_name!: string;

  @Column("boolean", { default: true })
  active!: boolean;

  @Column("varchar", { select: false })
  password!: string;

  public get full_name() {
    return `${this.first_name} ${this.last_name}`;
  }
}
export default User;
