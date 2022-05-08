import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WeekReportService } from './week-report.service';
import { WeekReportController } from './week-report.controller';
import { WeekReportEntity } from './entities/week-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeekReportEntity])],
  controllers: [WeekReportController],
  providers: [WeekReportService],
})
export class WeekReportModule {}
