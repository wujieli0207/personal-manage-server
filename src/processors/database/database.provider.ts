import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeekReportEntity } from '/@/modules/week-report/entities/week-report.entity';

export const DatabaseProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    entities: [WeekReportEntity],
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get('DB_PORT', 3306),
    username: configService.get('DB_USER', 'root'),
    password: configService.get('DB_PASSWD', '123456'),
    database: configService.get('DB_DATABASE'),
    timezone: '+08:00', //服务器上配置的时区
    synchronize: false, //根据实体自动创建数据库表， 生产环境建议关闭
  }),
});
