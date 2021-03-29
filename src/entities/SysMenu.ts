import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_pid", ["pid"], {})
@Index("idx_sort", ["sort"], {})
@Entity("sys_menu", { schema: "security_enterprise_tenant" })
export class sys_menu {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

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

  @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
  creator: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;

  @Column("bigint", { name: "updater", nullable: true, comment: "更新者" })
  updater: string | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    comment: "更新时间",
  })
  updated_at: Date | null;
}
