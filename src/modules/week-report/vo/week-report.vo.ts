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
  @ApiProperty({ description: 'id' })
  id: number;

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
