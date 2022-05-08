import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const APP = {
  port: 8081,
  prefix: 'api',
};

/**
 *
 * @description 设置 swagger 文档
 * ! TODO Swagger 配置没有生效
 */
export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('个人数据管理后端文档')
    .setDescription('个人数据管理后端文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // docs 为访问上下文
};
