import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_pid", ["pid"], {})
@Index("idx_sort", ["sort"], {})
@Entity("sys_dept", { schema: "race_nestjs_admin" })
export class sys_dept {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", { name: "pid", nullable: true, comment: "上级ID" })
  pid: string | null;

  @Column("varchar", {
    name: "pids",
    nullable: true,
    comment: "所有上级ID，用逗号分开",
    length: 500,
  })
  pids: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "部门名称",
    length: 50,
  })
  name: string | null;

  @Column("int", {
    name: "sort",
    nullable: true,
    comment: "排序",
    unsigned: true,
  })
  sort: number | null;

  @Column("bigint", {
    name: "tenant_code",
    nullable: true,
    comment: "租户编码",
  })
  tenant_code: string | null;

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
