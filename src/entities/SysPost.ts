import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_post", { schema: "race_nestjs_admin" })
export class sys_post {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "post_code",
    nullable: true,
    comment: "岗位编码",
    length: 100,
  })
  post_code: string | null;

  @Column("varchar", {
    name: "post_name",
    nullable: true,
    comment: "岗位名称",
    length: 100,
  })
  post_name: string | null;

  @Column("int", { name: "sort", nullable: true, comment: "排序" })
  sort: number | null;

  @Column("tinyint", {
    name: "status",
    nullable: true,
    comment: "状态  0：停用   1：正常",
  })
  status: number | null;

  @Column("bigint", {
    name: "tenant_code",
    nullable: true,
    comment: "租户编码",
  })
  tenant_code: string | null;

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
