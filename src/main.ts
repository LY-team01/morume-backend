import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('morume API')
    .setDescription('morume APIの仕様書です')
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix('/api');
  const document = SwaggerModule.createDocument(app, config);
  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      users: {
        [process.env.SWAGGER_USER || 'admin']:
          process.env.SWAGGER_PASS || 'password',
      },
      challenge: true,
    }),
  );

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
