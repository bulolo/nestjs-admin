import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_region", { schema: "security_enterprise_tenant" })
export class sys_region {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", { name: "pid", nullable: true, comment: "上级ID，一级为0" })
  pid: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "名称",
    length: 100,
  })
  name: string | null;

  @Column("tinyint", { name: "tree_level", nullable: true, comment: "层级" })
  tree_level: number | null;

  @Column("tinyint", {
    name: "leaf",
    nullable: true,
    comment: "是否叶子节点  0：否   1：是",
  })
  leaf: number | null;

  @Column("bigint", { name: "sort", nullable: true, comment: "排序" })
  sort: string | null;

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
