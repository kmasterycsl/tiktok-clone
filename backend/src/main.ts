import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const configService = app.get(ConfigService);
  setEnvVariables(configService);
  console.log(`Start api on ${process.env.HOST_NAME}:${process.env.API_PORT}`);
  await app.listen(process.env.API_PORT, process.env.HOST_NAME);
}
bootstrap();

function setEnvVariables(configService: ConfigService) {
  process.env['API_URL'] = configService.get('API_URL');
  process.env['API_PORT'] = configService.get('API_PORT');
  process.env['HOST_NAME'] = configService.get('HOST_NAME');
}
