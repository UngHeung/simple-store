import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { serverConfigOptions } from './auth/interface/auth-interface';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig: serverConfigOptions = config.get('server');
  const port = serverConfig.port;
  await app.listen(port);

  Logger.log(`>>>>> 애플리케이션 시작. 포트 : ${port}`);
}
bootstrap();
