import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../_base/base.entity";

@Index("idx_role_id", ["role_id"], {})
@Index("idx_user_id", ["user_id"], {})
  @Entity("sys_role_user", { schema: "race_nestjs_admin" })
export class sys_role_user extends BaseEntity{

  @Column("bigint", { name: "role_id", nullable: true, comment: "角色ID" })
  role_id: number | null;

  @Column("bigint", { name: "user_id", nullable: true, comment: "用户ID" })
  user_id: number | null;

}
