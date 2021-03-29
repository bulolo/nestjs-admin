import { Column, Entity } from "typeorm";

@Entity("sys_notice_user", { schema: "race_nestjs_admin" })
export class sys_notice_user {
  @Column("bigint", { primary: true, name: "receiver_id", comment: "接收者ID" })
  receiver_id: string;

  @Column("bigint", { primary: true, name: "notice_id", comment: "通知ID" })
  notice_id: string;

  @Column("tinyint", {
    name: "read_status",
    nullable: true,
    comment: "阅读状态  0：未读  1：已读",
    unsigned: true,
  })
  read_status: number | null;

  @Column("datetime", {
    name: "read_date",
    nullable: true,
    comment: "阅读时间",
  })
  read_date: Date | null;
}
