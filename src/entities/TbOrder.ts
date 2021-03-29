import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uk_order_id", ["order_id"], { unique: true })
@Entity("tb_order", { schema: "race_nestjs_admin" })
export class tb_order {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", {
    name: "order_id",
    nullable: true,
    unique: true,
    comment: "订单ID",
  })
  order_id: string | null;

  @Column("bigint", { name: "product_id", comment: "产品ID" })
  product_id: string;

  @Column("varchar", {
    name: "product_name",
    nullable: true,
    comment: "产品名称",
    length: 100,
  })
  product_name: string | null;

  @Column("decimal", {
    name: "pay_amount",
    comment: "支付金额",
    precision: 10,
    scale: 2,
  })
  pay_amount: string;

  @Column("tinyint", {
    name: "status",
    nullable: true,
    comment: "订单状态  -1：已取消   0：等待付款   1：已完成",
  })
  status: number | null;

  @Column("bigint", { name: "user_id", nullable: true, comment: "购买用户ID" })
  user_id: string | null;

  @Column("datetime", { name: "pay_at", nullable: true, comment: "支付时间" })
  pay_at: Date | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "下单时间",
  })
  created_at: Date | null;
}
