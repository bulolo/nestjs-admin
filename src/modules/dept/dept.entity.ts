import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { BaseTenantEntity } from "../_base/baseTenant.entity";

@Index("idx_pid", ["pid"], {})
@Index("idx_sort", ["sort"], {})
@Entity("sys_dept", { schema: "security_enterprise_tenant" })
export class DeptEntity extends BaseTenantEntity {

  @Column("bigint", { name: "pid", nullable: true, comment: "上级ID" })
  pid: number | null;

  @Column("varchar", {
    name: "pids",
    nullable: true,
    comment: "所有上级ID，用逗号分开",
    length: 500,
  })
  pids: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "部门名称",
    length: 50,
  })
  name: string | null;

  @Column("int", {
    name: "sort",
    nullable: true,
    comment: "排序",
    unsigned: true,
  })
  sort: number | null;

}
