import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../_base/base.entity";
import { BaseTenantEntity } from "../_base/baseTenant.entity";

@Index("uk_tenant_code", ["tenant_code"], { unique: true })
  @Index("idx_created_at", ["created_at"], {})
  @Entity("sys_tenant", { schema: "race_nestjs_admin" })
export class TenantEntity extends BaseTenantEntity{

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

}
