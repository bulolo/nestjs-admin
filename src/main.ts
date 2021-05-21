import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { ConfigService } from "@nestjs/config"
import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common'
import * as express from 'express'
import * as compression from 'compression'
import * as rateLimit from 'express-rate-limit'
import * as csurf from 'csurf'
import * as helmet from 'helmet';
import { AllExceptionsFilter } from './common/exception/all-exception.filter'


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  //允许跨域
  app.enableCors()
  // gzip压缩
  app.use(compression())
  // For parsing application/json
  app.use(express.json())
  // For parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }))
  // 速率限制
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 100 requests per windowMs
    }),
  )
  // 漏洞保护
  app.use(helmet());
  // CSRF保护
  // app.use(csurf())

  // 日志中间件
  app.use(new LoggerMiddleware().use)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    },
    // exceptionFactory: (errors: ValidationError[]) => new BadRequestException('参数校验错误')
  }))
  // 所有异常
  app.useGlobalFilters(new AllExceptionsFilter())
  // 设置 api 访问前缀
  app.setGlobalPrefix('/api')
  // swagger文档
  if (config.get<boolean>('app.swagger')) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('race-nestjs-admin')
      .setDescription('nestjs-admin 基于RABC的通用api文档')
      .setVersion('1.0')
      // .addTag('通用api接口')
      .addBearerAuth({ in: 'header', type: 'http' })
      .build()
    const document = SwaggerModule.createDocument(app, swaggerOptions)
    SwaggerModule.setup('docs', app, document)
    Logger.log(`/docs`, 'swagger启动成功')
  }
  await app.listen(config.get<number>('app.port') || 8080)
  const appLocalPath = await app.getUrl()
  Logger.log(appLocalPath, '服务启动成功')
  Logger.log(process.env.NODE_ENV, '当前启动环境')
}
bootstrap()
