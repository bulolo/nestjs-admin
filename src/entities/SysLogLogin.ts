import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_status", ["status"], {})
@Index("idx_create_date", ["created_at"], {})
@Entity("sys_log_login", { schema: "security_enterprise_tenant" })
export class sys_log_login {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("tinyint", {
    name: "operation",
    nullable: true,
    comment: "用户操作   0：用户登录   1：用户退出",
    unsigned: true,
  })
  operation: number | null;

  @Column("tinyint", {
    name: "status",
    comment: "状态  0：失败    1：成功    2：账号已锁定",
    unsigned: true,
  })
  status: number;

  @Column("varchar", {
    name: "user_agent",
    nullable: true,
    comment: "用户代理",
    length: 500,
  })
  user_agent: string | null;

  @Column("varchar", {
    name: "ip",
    nullable: true,
    comment: "操作IP",
    length: 32,
  })
  ip: string | null;

  @Column("varchar", {
    name: "creator_name",
    nullable: true,
    comment: "用户名",
    length: 50,
  })
  creator_name: string | null;

  @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
  creator: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
