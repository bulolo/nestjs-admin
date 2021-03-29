import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_job_id", ["job_id"], {})
@Index("idx_create_date", ["created_at"], {})
@Entity("schedule_job_log", { schema: "race_nestjs_admin" })
export class schedule_job_log {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", { name: "job_id", comment: "任务id" })
  job_id: string;

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

  @Column("tinyint", {
    name: "status",
    comment: "任务状态    0：失败    1：成功",
    unsigned: true,
  })
  status: number;

  @Column("varchar", {
    name: "error",
    nullable: true,
    comment: "失败信息",
    length: 2000,
  })
  error: string | null;

  @Column("int", { name: "times", comment: "耗时(单位：毫秒)" })
  times: number;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
