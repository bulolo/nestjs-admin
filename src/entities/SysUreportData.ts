import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_ureport_data", { schema: "security_enterprise_tenant" })
export class sys_ureport_data {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "file_name",
    nullable: true,
    comment: "报表文件名",
    length: 200,
  })
  file_name: string | null;

  @Column("mediumblob", { name: "content", nullable: true, comment: "内容" })
  content: Buffer | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    comment: "更新时间",
  })
  updated_at: Date | null;
}
