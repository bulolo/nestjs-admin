import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../_base/base.entity";

@Index("idx_role_id", ["role_id"], {})
@Index("idx_menu_id", ["menu_id"], {})
  @Entity("sys_role_menu", { schema: "race_nestjs_admin" })
export class sys_role_menu extends BaseEntity{

  @Column("bigint", { name: "role_id", nullable: true, comment: "角色ID" })
  role_id: string | null;

  @Column("bigint", { name: "menu_id", nullable: true, comment: "菜单ID" })
  menu_id: string | null;

}
