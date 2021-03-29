import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uk_sms_code", ["sms_code"], { unique: true })
@Index("idx_create_date", ["created_at"], {})
@Entity("sys_sms", { schema: "race_nestjs_admin" })
export class sys_sms {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "sms_code",
    nullable: true,
    unique: true,
    comment: "短信编码",
    length: 32,
  })
  sms_code: string | null;

  @Column("tinyint", { name: "platform", comment: "平台类型", unsigned: true })
  platform: number;

  @Column("varchar", {
    name: "sms_config",
    nullable: true,
    comment: "短信配置",
    length: 2000,
  })
  sms_config: string | null;

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
