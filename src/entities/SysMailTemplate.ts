import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_create_date", ["created_at"], {})
@Entity("sys_mail_template", { schema: "security_enterprise_tenant" })
export class sys_mail_template {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "模板名称",
    length: 100,
  })
  name: string | null;

  @Column("varchar", {
    name: "subject",
    nullable: true,
    comment: "邮件主题",
    length: 200,
  })
  subject: string | null;

  @Column("text", { name: "content", nullable: true, comment: "邮件正文" })
  content: string | null;

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
