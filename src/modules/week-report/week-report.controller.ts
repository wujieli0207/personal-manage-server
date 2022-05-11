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
import { ResultRo } from 'types/app';
import { GetWeekReportVO, WeekReportListVO } from './vo/week-report.vo';

@ApiTags('每周统计报告查询')
@Controller('week-report')
export class WeekReportController {
  constructor(private readonly weekReportService: WeekReportService) {}

  @Post()
  create(@Body() createWeekReportDto: CreateWeekReportDto) {
    return this.weekReportService.create(createWeekReportDto);
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

  @Get('getWeekReport/:id')
  @ApiOperation({ summary: '根据id获取一个周报数据' })
  getReportById(@Param('id') id: string) {
    return this.weekReportService.getReportById(Number(id));
  }

  @ApiOperation({ summary: '根据年份查询周报告数据' })
  @Post('/getWeekReport')
  async getReportByYear(
    @Body() query: GetWeekReportVO,
  ): Promise<ResultRo<WeekReportListVO>> {
    console.log('query: ', query);
    return this.weekReportService.getReportByYear(query);
  }
}
