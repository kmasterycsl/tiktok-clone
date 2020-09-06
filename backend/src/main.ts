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
  await app.listen(process.env.API_PORT);
}
bootstrap();

function setEnvVariables(configService: ConfigService) {
  process.env['API_URL'] = configService.get('API_URL');
  process.env['API_PORT'] = configService.get('API_PORT');
}
