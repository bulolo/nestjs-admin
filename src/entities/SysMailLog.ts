import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_create_date", ["created_at"], {})
@Entity("sys_mail_log", { schema: "security_enterprise_tenant" })
export class sys_mail_log {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", { name: "template_id", comment: "邮件模板ID" })
  template_id: string;

  @Column("varchar", {
    name: "mail_from",
    nullable: true,
    comment: "发送者",
    length: 200,
  })
  mail_from: string | null;

  @Column("varchar", {
    name: "mail_to",
    nullable: true,
    comment: "收件人",
    length: 400,
  })
  mail_to: string | null;

  @Column("varchar", {
    name: "mail_cc",
    nullable: true,
    comment: "抄送者",
    length: 400,
  })
  mail_cc: string | null;

  @Column("varchar", {
    name: "subject",
    nullable: true,
    comment: "邮件主题",
    length: 200,
  })
  subject: string | null;

  @Column("text", { name: "content", nullable: true, comment: "邮件正文" })
  content: string | null;

  @Column("tinyint", {
    name: "status",
    nullable: true,
    comment: "发送状态  0：失败  1：成功",
    unsigned: true,
  })
  status: number | null;

  @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
  creator: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
