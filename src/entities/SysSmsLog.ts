import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_sms_code", ["sms_code"], {})
@Entity("sys_sms_log", { schema: "race_nestjs_admin" })
export class sys_sms_log {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "sms_code",
    nullable: true,
    comment: "短信编码",
    length: 32,
  })
  sms_code: string | null;

  @Column("tinyint", { name: "platform", comment: "平台类型", unsigned: true })
  platform: number;

  @Column("varchar", {
    name: "mobile",
    nullable: true,
    comment: "手机号",
    length: 20,
  })
  mobile: string | null;

  @Column("varchar", {
    name: "params_1",
    nullable: true,
    comment: "参数1",
    length: 50,
  })
  params_1: string | null;

  @Column("varchar", {
    name: "params_2",
    nullable: true,
    comment: "参数2",
    length: 50,
  })
  params_2: string | null;

  @Column("varchar", {
    name: "params_3",
    nullable: true,
    comment: "参数3",
    length: 50,
  })
  params_3: string | null;

  @Column("varchar", {
    name: "params_4",
    nullable: true,
    comment: "参数4",
    length: 50,
  })
  params_4: string | null;

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
