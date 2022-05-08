import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm';
import { Common } from '/@/models/common.module';

@Entity('t_week_report')
export class WeekReportEntity extends Common {
  @PrimaryGeneratedColumn('increment')
  @PrimaryColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'title', type: 'varchar', comment: '周总结标题' })
  title: string;

  @Column({
    name: 'work_day_pomo',
    type: 'int',
    comment: '工作日学习番茄钟数量',
  })
  workDayPomo: number;

  @Column({
    name: 'rest_day_pomo',
    type: 'int',
    comment: '休息日学习番茄钟数量',
  })
  restDayPomo: number;

  @Column({
    name: 'workout_times',
    type: 'int',
    comment: '健身次数',
  })
  workoutTimes: number;

  @Column({
    name: 'average_sleep_hour',
    type: 'decimal',
    comment: '平均睡眠时长',
  })
  averageSleepHour: number;

  @Column({
    name: 'start_date',
    type: 'date',
    comment: '开始时间',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    comment: '结束时间',
  })
  endDate: Date;
}
