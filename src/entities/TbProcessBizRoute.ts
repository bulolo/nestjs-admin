import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_process_biz_route", { schema: "security_enterprise_tenant" })
export class tb_process_biz_route {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("varchar", { name: "proc_def_id", comment: "流程定义ID", length: 64 })
  proc_def_id: string;

  @Column("varchar", { name: "biz_route", comment: "业务路由", length: 255 })
  biz_route: string;

  @Column("varchar", {
    name: "proc_def_key",
    nullable: true,
    comment: "流程定义KEY",
    length: 255,
  })
  proc_def_key: string | null;

  @Column("int", { name: "version", nullable: true, comment: "版本号" })
  version: number | null;
}
