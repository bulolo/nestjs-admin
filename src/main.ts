import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // swagger文档
  const config = new DocumentBuilder()
    .setTitle('race-nestjs-admin')
    .setDescription('nestjs-admin 基于RABC的通用api文档')
    .setVersion('1.0')
    .addTag('通用api接口')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  app.use(new LoggerMiddleware().use)

  await app.listen(3000);
}
bootstrap();
