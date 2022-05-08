import { PartialType } from '@nestjs/swagger';
import { CreateWeekReportDto } from './create-week-report.dto';

export class UpdateWeekReportDto extends PartialType(CreateWeekReportDto) {}
