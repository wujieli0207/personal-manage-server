import {
  Injectable,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
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

  /**
   *
   * @description 新增数据
   */
  async create(
    createWeekReportDto: CreateWeekReportDto,
  ): Promise<WeekReportListVO> {
    logger.info(
      `create 新增数据请求参数: ${JSON.stringify(createWeekReportDto)}`,
    );

    const { title } = createWeekReportDto;

    if (!title) {
      throw new HttpException('缺少周总结数据标题', HttpStatus.UNAUTHORIZED);
    }

    const weekReport = await this.weekReportRepository.findOne({
      where: { title },
    });

    if (weekReport) {
      throw new HttpException(
        '该周总结数据标题已存在',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.weekReportRepository.save(createWeekReportDto);
  }

  /**
   *
   * @description 更新数据
   */
  async update(
    id: number,
    updateWeekReportDto: UpdateWeekReportDto,
  ): Promise<WeekReportListVO> {
    logger.info(
      `update 更新数据请求参数: id:${id}, updateWeekReportDto: ${JSON.stringify(
        updateWeekReportDto,
      )} `,
    );

    const existWeekReport = await this.weekReportRepository.findOne(id);

    if (!existWeekReport) {
      throw new HttpException(
        `id 为${id}的数据不存在`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const updateWeekReport = this.weekReportRepository.merge(
      existWeekReport,
      updateWeekReportDto,
    );

    logger.info(
      `update 更新后的数据参数为: ${JSON.stringify(updateWeekReport)}`,
    );

    return this.weekReportRepository.save(updateWeekReport);
  }

  /**
   *
   * @description 删除数据
   */
  async remove(id: number): Promise<WeekReportListVO> {
    logger.info(`remove 删除数据请求参数: ${id}`);

    const existWeekReport = await this.weekReportRepository.findOne(id);

    if (!existWeekReport) {
      throw new HttpException(
        `id 为${id}的数据不存在`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const deleteWeekReport = cloneDeep(existWeekReport);
    deleteWeekReport.rcState = rcStateEnum.Deleted;

    logger.info(
      `update 更新后的数据参数为: ${JSON.stringify(deleteWeekReport)}`,
    );

    return await this.weekReportRepository.save(deleteWeekReport);
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
