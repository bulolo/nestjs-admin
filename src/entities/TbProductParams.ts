import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_product_params", { schema: "security_enterprise_tenant" })
export class tb_product_params {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", {
    name: "param_name",
    nullable: true,
    comment: "参数名",
    length: 100,
  })
  param_name: string | null;

  @Column("varchar", {
    name: "param_value",
    nullable: true,
    comment: "参数值",
    length: 200,
  })
  param_value: string | null;

  @Column("bigint", { name: "product_id", nullable: true, comment: "产品ID" })
  product_id: string | null;

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
