import { Column, Entity, Index } from "typeorm";

@Index("idx_table_id", ["table_id"], {})
@Entity("sys_language", { schema: "race_nestjs_admin" })
export class sys_language {
  @Column("varchar", {
    primary: true,
    name: "table_name",
    comment: "表名",
    length: 32,
  })
  table_name: string;

  @Column("bigint", { primary: true, name: "table_id", comment: "表主键" })
  table_id: string;

  @Column("varchar", {
    primary: true,
    name: "field_name",
    comment: "字段名",
    length: 32,
  })
  field_name: string;

  @Column("varchar", { name: "field_value", comment: "字段值", length: 200 })
  field_value: string;

  @Column("varchar", {
    primary: true,
    name: "language",
    comment: "语言",
    length: 10,
  })
  language: string;
}
