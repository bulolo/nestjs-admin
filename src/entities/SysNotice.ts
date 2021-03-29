import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_create_date", ["created_at"], {})
@Entity("sys_notice", { schema: "security_enterprise_tenant" })
export class sys_notice {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("int", { name: "type", comment: "通知类型" })
  type: number;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "标题",
    length: 200,
  })
  title: string | null;

  @Column("text", { name: "content", nullable: true, comment: "内容" })
  content: string | null;

  @Column("tinyint", {
    name: "receiver_type",
    nullable: true,
    comment: "接收者  0：全部  1：部门",
    unsigned: true,
  })
  receiver_type: number | null;

  @Column("varchar", {
    name: "receiver_type_ids",
    nullable: true,
    comment: "接收者ID，用逗号分开",
    length: 500,
  })
  receiver_type_ids: string | null;

  @Column("tinyint", {
    name: "status",
    nullable: true,
    comment: "发送状态  0：草稿  1：已发布",
    unsigned: true,
  })
  status: number | null;

  @Column("varchar", {
    name: "sender_name",
    nullable: true,
    comment: "发送者",
    length: 50,
  })
  sender_name: string | null;

  @Column("datetime", {
    name: "sender_date",
    nullable: true,
    comment: "发送时间",
  })
  sender_date: Date | null;

  @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
  creator: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
