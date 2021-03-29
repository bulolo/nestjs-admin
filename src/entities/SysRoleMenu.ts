import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_role_id", ["role_id"], {})
@Index("idx_menu_id", ["menu_id"], {})
@Entity("sys_role_menu", { schema: "race_nestjs_admin" })
export class sys_role_menu {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", { name: "role_id", nullable: true, comment: "角色ID" })
  role_id: string | null;

  @Column("bigint", { name: "menu_id", nullable: true, comment: "菜单ID" })
  menu_id: string | null;

  @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
  creator: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
