import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_create_date", ["created_at"], {})
@Entity("sys_log_error", { schema: "security_enterprise_tenant" })
export class sys_log_error {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "request_uri",
    nullable: true,
    comment: "请求URI",
    length: 200,
  })
  request_uri: string | null;

  @Column("varchar", {
    name: "request_method",
    nullable: true,
    comment: "请求方式",
    length: 20,
  })
  request_method: string | null;

  @Column("text", {
    name: "request_params",
    nullable: true,
    comment: "请求参数",
  })
  request_params: string | null;

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

  @Column("text", { name: "error_info", nullable: true, comment: "异常信息" })
  error_info: string | null;

  @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
  creator: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
