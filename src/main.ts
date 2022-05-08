import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from '/@/filter/error.filter';
import { APP, setupSwagger } from '/@/app.config';
import { TransformInterceptor } from '/@/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 注册全局路由前缀
  app.setGlobalPrefix(APP.prefix);

  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 注册全局错误拦截器
  app.useGlobalFilters(new ErrorFilter());

  // 注册 swagger
  setupSwagger(app);

  await app.listen(APP.port);
}
bootstrap();
