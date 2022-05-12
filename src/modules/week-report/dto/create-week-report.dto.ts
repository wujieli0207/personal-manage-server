import { ApiProperty } from '@nestjs/swagger';
import { Common } from '/@/models/common.module';

export class CreateWeekReportDto extends Common {
  @ApiProperty({ description: '周总结标题' })
  title: string;

  @ApiProperty({ description: '工作日学习番茄钟数量' })
  workDayPomo: number;

  @ApiProperty({ description: '休息日学习番茄钟数量' })
  restDayPomo: number;

  @ApiProperty({ description: '健身次数' })
  workoutTimes: number;

  @ApiProperty({ description: '平均睡眠时长' })
  averageSleepHour: number;

  @ApiProperty({ description: '开始时间' })
  startDate: Date;

  @ApiProperty({ description: '结束时间' })
  endDate: Date;
}
