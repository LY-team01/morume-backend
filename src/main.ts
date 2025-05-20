import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as admin from 'firebase-admin';

const serviceAccount = {
  projectId: process.env.GOOGLE_PROJECT_ID,
  privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
} as admin.ServiceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('morume API')
    .setDescription('morume APIの仕様書です')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'JWTを入力してください',
        in: 'header',
      },
      'firebase-token',
    )
    .addSecurity('firebase-token', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  app.setGlobalPrefix('/api');

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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
