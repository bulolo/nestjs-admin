import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_alipay_notify_log", { schema: "security_enterprise_tenant" })
export class tb_alipay_notify_log {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", { name: "out_trade_no", nullable: true, comment: "订单号" })
  out_trade_no: string | null;

  @Column("decimal", {
    name: "total_amount",
    nullable: true,
    comment: "订单金额",
    precision: 10,
    scale: 2,
  })
  total_amount: string | null;

  @Column("decimal", {
    name: "buyer_pay_amount",
    nullable: true,
    comment: "付款金额",
    precision: 10,
    scale: 2,
  })
  buyer_pay_amount: string | null;

  @Column("decimal", {
    name: "receipt_amount",
    nullable: true,
    comment: "实收金额",
    precision: 10,
    scale: 2,
  })
  receipt_amount: string | null;

  @Column("decimal", {
    name: "invoice_amount",
    nullable: true,
    comment: "开票金额",
    precision: 10,
    scale: 2,
  })
  invoice_amount: string | null;

  @Column("varchar", {
    name: "notify_id",
    nullable: true,
    comment: "通知校验ID",
    length: 50,
  })
  notify_id: string | null;

  @Column("varchar", {
    name: "buyer_id",
    nullable: true,
    comment: "买家支付宝用户号",
    length: 50,
  })
  buyer_id: string | null;

  @Column("varchar", {
    name: "seller_id",
    nullable: true,
    comment: "卖家支付宝用户号",
    length: 50,
  })
  seller_id: string | null;

  @Column("varchar", {
    name: "trade_no",
    nullable: true,
    comment: "支付宝交易号",
    length: 50,
  })
  trade_no: string | null;

  @Column("varchar", {
    name: "trade_status",
    nullable: true,
    comment: "交易状态",
    length: 50,
  })
  trade_status: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
