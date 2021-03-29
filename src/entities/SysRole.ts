import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_dept_id", ["dept_id"], {})
@Entity("sys_role", { schema: "race_nestjs_admin" })
export class sys_role {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "角色名称",
    length: 50,
  })
  name: string | null;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注",
    length: 100,
  })
  remark: string | null;

  @Column("bigint", { name: "dept_id", nullable: true, comment: "部门ID" })
  dept_id: string | null;

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
