import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetWeekReportVO {
  @ApiProperty({ description: '年份', default: new Date().getFullYear() })
  year: number;

  @ApiPropertyOptional({ description: '每页数据', default: 10 })
  pageSize: number;

  @ApiPropertyOptional({ description: '当前页数', default: 1 })
  currentPage: number;
}

export class WeekReportListVO {
  @ApiProperty({ name: 'id' })
  id: number;

  @ApiProperty({ name: '周总结标题' })
  title: string;

  @ApiProperty({ name: '工作日学习番茄钟数量' })
  workDayPomo: number;

  @ApiProperty({ name: '休息日学习番茄钟数量' })
  restDayPomo: number;

  @ApiProperty({ name: '健身次数' })
  workoutTimes: number;

  @ApiProperty({ name: '平均睡眠时长' })
  averageSleepHour: number;

  @ApiProperty({ name: '开始时间' })
  startDate: Date;

  @ApiProperty({ name: '结束时间' })
  endDate: Date;
}
