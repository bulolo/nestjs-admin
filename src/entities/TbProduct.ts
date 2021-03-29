import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_product", { schema: "security_enterprise_tenant" })
export class tb_product {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", { name: "name", comment: "产品名称", length: 100 })
  name: string;

  @Column("mediumtext", { name: "content", comment: "产品介绍" })
  content: string;

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
