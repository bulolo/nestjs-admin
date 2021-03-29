import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uk_dict_type_value", ["dict_type_id", "dict_value"], { unique: true })
@Index("idx_sort", ["sort"], {})
@Entity("sys_dict_data", { schema: "security_enterprise_tenant" })
export class sys_dict_data {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", { name: "dict_type_id", comment: "字典类型ID" })
  dict_type_id: string;

  @Column("varchar", { name: "dict_label", comment: "字典标签", length: 255 })
  dict_label: string;

  @Column("varchar", {
    name: "dict_value",
    nullable: true,
    comment: "字典值",
    length: 255,
  })
  dict_value: string | null;

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
