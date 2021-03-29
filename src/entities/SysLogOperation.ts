import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_create_date", ["created_at"], {})
@Entity("sys_log_operation", { schema: "race_nestjs_admin" })
export class sys_log_operation {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "operation",
    nullable: true,
    comment: "用户操作",
    length: 50,
  })
  operation: string | null;

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

  @Column("int", {
    name: "request_time",
    comment: "请求时长(毫秒)",
    unsigned: true,
  })
  request_time: number;

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

  @Column("tinyint", {
    name: "status",
    comment: "状态  0：失败   1：成功",
    unsigned: true,
  })
  status: number;

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
