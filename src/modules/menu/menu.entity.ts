import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../_base/base.entity";

@Index("idx_pid", ["pid"], {})
@Index("idx_sort", ["sort"], {})
  @Entity("sys_menu", { schema: "race_nestjs_admin" })
export class sys_menu extends BaseEntity {

  @Column("bigint", {
    name: "pid",
    nullable: true,
    comment: "上级ID，一级菜单为0",
  })
  pid: string | null;

  @Column("varchar", {
    name: "url",
    nullable: true,
    comment: "菜单URL",
    length: 200,
  })
  url: string | null;

  @Column("varchar", {
    name: "permissions",
    nullable: true,
    comment: "授权(多个用逗号分隔，如：sys:user:list,sys:user:save)",
    length: 500,
  })
  permissions: string | null;

  @Column("tinyint", {
    name: "type",
    nullable: true,
    comment: "类型   0：菜单   1：按钮",
    unsigned: true,
  })
  type: number | null;

  @Column("varchar", {
    name: "icon",
    nullable: true,
    comment: "菜单图标",
    length: 50,
  })
  icon: string | null;

  @Column("int", { name: "sort", nullable: true, comment: "排序" })
  sort: number | null;

}
