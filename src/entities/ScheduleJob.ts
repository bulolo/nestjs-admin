import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_create_date", ["created_at"], {})
@Entity("schedule_job", { schema: "race_nestjs_admin" })
export class schedule_job {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "bean_name",
    nullable: true,
    comment: "spring bean名称",
    length: 200,
  })
  bean_name: string | null;

  @Column("varchar", {
    name: "params",
    nullable: true,
    comment: "参数",
    length: 2000,
  })
  params: string | null;

  @Column("varchar", {
    name: "cron_expression",
    nullable: true,
    comment: "cron表达式",
    length: 100,
  })
  cron_expression: string | null;

  @Column("tinyint", {
    name: "status",
    nullable: true,
    comment: "任务状态  0：暂停  1：正常",
    unsigned: true,
  })
  status: number | null;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注",
    length: 255,
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
