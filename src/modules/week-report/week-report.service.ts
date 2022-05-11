import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { ResultRo } from 'types/app';
import { CreateWeekReportDto } from './dto/create-week-report.dto';
import { UpdateWeekReportDto } from './dto/update-week-report.dto';
import { WeekReportEntity } from './entities/week-report.entity';
import { GetWeekReportVO, WeekReportListVO } from './vo/week-report.vo';
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
   * @description 根据id获取一个周报数据
   */
  async getReportById(id: number): Promise<WeekReportListVO> {
    logger.info(`getReportById 根据id获取一个周报数据查询条件: ${id}`);

    const qb = createQueryBuilder(WeekReportEntity, 't1')
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
      .where('t1.id = :id', { id });

    const result: WeekReportListVO = await qb.getOne();

    logger.info(
      `getReportById 根据id获取一个周报数据查询结果: ${JSON.stringify(result)}`,
    );

    return result;
  }

  /**
   *
   * @description 根据年份查询周报告数据
   */
  async getReportByYear(
    query: GetWeekReportVO,
  ): Promise<ResultRo<WeekReportListVO>> {
    const { year, pageSize = 10, currentPage = 1 } = query;

    logger.info(
      `getReportByYear 根据年份查询周报告数据查询条件: ${JSON.stringify(
        query,
      )}`,
    );

    const qb = createQueryBuilder(WeekReportEntity, 't1')
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
      .orderBy('t1.start_date', 'DESC')
      .take(pageSize)
      .skip(pageSize * (currentPage - 1));

    const count = await qb.getCount();
    const list = await qb.getMany();

    const result: ResultRo<WeekReportListVO> = {
      list,
      count,
    };

    logger.info(
      `getReportByYear 根据年份查询周报告数据查询结果: ${JSON.stringify(list)}`,
    );

    return result;
  }
}
