import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_excel_data", { schema: "race_nestjs_admin" })
export class tb_excel_data {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "real_name",
    nullable: true,
    comment: "学生姓名",
    length: 100,
  })
  real_name: string | null;

  @Column("varchar", {
    name: "identity",
    nullable: true,
    comment: "身份证",
    length: 100,
  })
  identity: string | null;

  @Column("varchar", {
    name: "address",
    nullable: true,
    comment: "家庭地址",
    length: 200,
  })
  address: string | null;

  @Column("datetime", {
    name: "join_date",
    nullable: true,
    comment: "入学日期",
  })
  join_date: Date | null;

  @Column("varchar", {
    name: "class_name",
    nullable: true,
    comment: "班级名称",
    length: 100,
  })
  class_name: string | null;

  @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
  creator: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
