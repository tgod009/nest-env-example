import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(morgan('tiny'));

  const options = new DocumentBuilder()
    .setTitle('Cubeless API')
    .setDescription('Cubeless API application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(
    configService.get('PORT') || 8080,
    configService.get('HOST') || '0.0.0.0',
    () => {
      console.log(`Server listening on port ${configService.get('PORT')}...`);
    },
  );
}
bootstrap();
