import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_news", { schema: "race_nestjs_admin" })
export class tb_news {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", { name: "title", comment: "标题", length: 100 })
  title: string;

  @Column("mediumtext", { name: "content", comment: "内容" })
  content: string;

  @Column("datetime", { name: "pub_date", nullable: true, comment: "发布时间" })
  pub_date: Date | null;

  @Column("bigint", {
    name: "dept_id",
    nullable: true,
    comment: "创建者dept_id",
  })
  dept_id: string | null;

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
