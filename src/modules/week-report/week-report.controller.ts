import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WeekReportService } from './week-report.service';
import { CreateWeekReportDto } from './dto/create-week-report.dto';
import { UpdateWeekReportDto } from './dto/update-week-report.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('每周统计报告查询')
@Controller('week-report')
export class WeekReportController {
  constructor(private readonly weekReportService: WeekReportService) {}

  @Post()
  create(@Body() createWeekReportDto: CreateWeekReportDto) {
    return this.weekReportService.create(createWeekReportDto);
  }

  @Get()
  findAll() {
    return this.weekReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weekReportService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWeekReportDto: UpdateWeekReportDto,
  ) {
    return this.weekReportService.update(+id, updateWeekReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weekReportService.remove(+id);
  }

  @ApiOperation({ summary: '根据年份查询周报告数据' })
  @Get('/getWeekReport/:year')
  getReportByYear(@Param('year') year: string) {
    return this.weekReportService.getReportByYear(Number(year));
  }
}
