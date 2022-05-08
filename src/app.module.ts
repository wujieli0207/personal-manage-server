import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WeekReportModule } from './modules/week-report/week-report.module';
import envConfig from '../config/env';
import { DatabaseModule } from '/@/processors/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    DatabaseModule,
    WeekReportModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
