import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uk_tenant_code", ["tenant_code"], { unique: true })
@Index("idx_create_date", ["created_at"], {})
@Entity("sys_tenant", { schema: "security_enterprise_tenant" })
export class sys_tenant {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", {
    name: "tenant_code",
    nullable: true,
    unique: true,
    comment: "租户编码",
  })
  tenant_code: string | null;

  @Column("varchar", {
    name: "tenant_name",
    nullable: true,
    comment: "租户名称",
    length: 50,
  })
  tenant_name: string | null;

  @Column("tinyint", {
    name: "status",
    nullable: true,
    comment: "状态  0：停用    1：正常",
    unsigned: true,
  })
  status: number | null;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注",
    length: 200,
  })
  remark: string | null;

  @Column("bigint", {
    name: "user_id",
    nullable: true,
    comment: "登录账号ID",
    unsigned: true,
  })
  user_id: string | null;

  @Column("varchar", {
    name: "username",
    nullable: true,
    comment: "登录账号",
    length: 50,
  })
  username: string | null;

  @Column("tinyint", {
    name: "del_flag",
    nullable: true,
    comment: "删除标识 0：未删除    1：删除",
    unsigned: true,
  })
  del_flag: number | null;

  @Column("tinyint", {
    name: "sys_tenant",
    nullable: true,
    comment: "系统租户   0：否   1：是",
    unsigned: true,
  })
  sys_tenant: number | null;

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
