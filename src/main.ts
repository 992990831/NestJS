import { ConfigService } from '@nestjs/config';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './utils/globalexception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionsFilter(httpAdapter));

  //await app.listen(3000);
  //改为从配置读取
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get('port'));
}
bootstrap();
