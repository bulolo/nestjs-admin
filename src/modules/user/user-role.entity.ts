import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "../role/role.entity";
import { BaseEntity } from "../_base/base.entity";
import { UserEntity } from "./user.entity";

@Index("idx_role_id", ["role_id"], {})
@Index("idx_user_id", ["user_id"], {})
  @Entity("sys_user_role", { schema: "race_nestjs_admin" })
export class UserRoleEntity extends BaseEntity{

  @Column("bigint", { name: "role_id", nullable: true, comment: "角色ID" })
  role_id: number | null;

  @Column("bigint", { name: "user_id", nullable: true, comment: "用户ID" })
  user_id: number | null;


  @ManyToOne(
    type => UserEntity,
    user => user.userRoles,
  )
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity


  @ManyToOne(
    type => RoleEntity,
    role => role.userRoles,
  )
  @JoinColumn({ name: 'role_id' })
  role!: RoleEntity
}
