import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uk_param_code", ["param_code"], { unique: true })
@Index("idx_create_date", ["created_at"], {})
@Entity("sys_params", { schema: "security_enterprise_tenant" })
export class sys_params {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "param_code",
    nullable: true,
    unique: true,
    comment: "参数编码",
    length: 32,
  })
  param_code: string | null;

  @Column("varchar", {
    name: "param_value",
    nullable: true,
    comment: "参数值",
    length: 2000,
  })
  param_value: string | null;

  @Column("tinyint", {
    name: "param_type",
    nullable: true,
    comment: "类型   0：系统参数   1：非系统参数",
    unsigned: true,
    default: () => "'1'",
  })
  param_type: number | null;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注",
    length: 200,
  })
  remark: string | null;

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
