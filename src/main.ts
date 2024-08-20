import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig: any = config.get('server');
  const port = serverConfig.port;
  await app.listen(port);

  Logger.log(`>>>>> 애플리케이션 시작. 포트 : ${port}`);
}
bootstrap();
