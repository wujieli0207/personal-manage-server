import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { rcStateEnum } from '/@/constants/system.constant';

export abstract class Common {
  @Column({
    name: 'rc_state',
    type: 'varchar',
    default: rcStateEnum.Exist,
    comment: '是否有效',
  })
  rcState: string;

  @Column({
    name: 'created_by',
    type: 'varchar',
    default: 'admin',
    comment: '创建人',
  })
  createdBy: string;

  // ! TODO 创建时间在创建数据时自动插入
  @CreateDateColumn({
    name: 'created_time',
    type: 'timestamp',
    comment: '创建时间',
  })
  createdTime: Date;

  // ! TODO 更新人在修改数据时自动更新
  @Column({
    name: 'updated_by',
    type: 'varchar',
    default: 'admin',
    comment: '更新人',
  })
  updatedBy: string;

  @UpdateDateColumn({
    name: 'updated_time',
    type: 'timestamp',
    comment: '创建时间',
  })
  updatedTime: Date;
}
