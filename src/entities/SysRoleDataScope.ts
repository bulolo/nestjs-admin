import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_role_id", ["role_id"], {})
@Entity("sys_role_data_scope", { schema: "race_nestjs_admin" })
export class sys_role_data_scope {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", { name: "role_id", nullable: true, comment: "角色ID" })
  role_id: string | null;

  @Column("bigint", { name: "dept_id", nullable: true, comment: "部门ID" })
  dept_id: string | null;

  @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
  creator: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
