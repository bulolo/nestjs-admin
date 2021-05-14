import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../_base/base.entity";

@Index("idx_post_id", ["post_id"], {})
@Index("idx_user_id", ["user_id"], {})
  @Entity("sys_user_post", { schema: "race_nestjs_admin" })
export class sys_user_post extends BaseEntity{

  @Column("bigint", { name: "post_id", nullable: true, comment: "岗位ID" })
  post_id: string | null;

  @Column("bigint", { name: "user_id", nullable: true, comment: "用户ID" })
  user_id: number | null;

}
