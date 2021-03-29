import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dict_type", ["dict_type"], { unique: true })
@Entity("sys_dict_type", { schema: "security_enterprise_tenant" })
export class sys_dict_type {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "dict_type",
    unique: true,
    comment: "字典类型",
    length: 100,
  })
  dict_type: string;

  @Column("varchar", { name: "dict_name", comment: "字典名称", length: 255 })
  dict_name: string;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注",
    length: 255,
  })
  remark: string | null;

  @Column("int", {
    name: "sort",
    nullable: true,
    comment: "排序",
    unsigned: true,
  })
  sort: number | null;

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
