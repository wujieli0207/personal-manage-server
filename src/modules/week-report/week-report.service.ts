import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { CreateWeekReportDto } from './dto/create-week-report.dto';
import { UpdateWeekReportDto } from './dto/update-week-report.dto';
import { WeekReportEntity } from './entities/week-report.entity';
import { WeekReportListVO } from './vo/week-report-list.vo';
import { rcStateEnum } from '/@/constants/system.constant';
import logger from '/@/utils/logger';

@Injectable()
export class WeekReportService {
  constructor(
    @InjectRepository(WeekReportEntity)
    private readonly weekReportRepository: Repository<WeekReportEntity>,
  ) {}

  create(createWeekReportDto: CreateWeekReportDto) {
    return 'This action adds a new weekReport';
  }

  findAll() {
    return `This action returns all weekReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weekReport`;
  }

  update(id: number, updateWeekReportDto: UpdateWeekReportDto) {
    return `This action updates a #${id} weekReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} weekReport`;
  }

  /**
   *
   * @description 根据年份查询周报告数据
   */
  async getReportByYear(year: number): Promise<Array<WeekReportListVO>> {
    logger.info(
      `getReportByYear 根据年份查询周报告数据条件: ${JSON.stringify(year)}`,
    );

    const query = createQueryBuilder(WeekReportEntity, 't1')
      .select([
        't1.id',
        't1.title',
        't1.workDayPomo',
        't1.restDayPomo',
        't1.workoutTimes',
        't1.averageSleepHour',
        't1.startDate',
        't1.endDate',
      ])
      .where('Date_FORMAT(t1.start_date, "%Y") = :year', { year })
      .andWhere('t1.rc_state = :rcState', { rcState: rcStateEnum.Exist })
      .orderBy('t1.start_date', 'DESC');

    const report = await query.getMany();

    logger.info(
      `getReportByYear 根据年份查询周报告数据结果: ${JSON.stringify(report)}`,
    );

    return report;
  }
}
