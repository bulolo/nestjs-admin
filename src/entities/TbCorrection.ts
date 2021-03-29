import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_correction", { schema: "security_enterprise_tenant" })
export class tb_correction {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "apply_post",
    nullable: true,
    comment: "申请岗位",
    length: 255,
  })
  apply_post: string | null;

  @Column("datetime", {
    name: "entry_date",
    nullable: true,
    comment: "入职日期",
  })
  entry_date: Date | null;

  @Column("datetime", {
    name: "correction_date",
    nullable: true,
    comment: "转正日期",
  })
  correction_date: Date | null;

  @Column("varchar", {
    name: "work_content",
    nullable: true,
    comment: "工作内容",
    length: 2000,
  })
  work_content: string | null;

  @Column("varchar", {
    name: "achievement",
    nullable: true,
    comment: "工作成绩",
    length: 2000,
  })
  achievement: string | null;

  @Column("varchar", {
    name: "instance_id",
    nullable: true,
    comment: "实例ID",
    length: 80,
  })
  instance_id: string | null;

  @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
  creator: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
