import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Nestjs')
  .setDescription('Nestjs REST API')
  .setVersion('9.0.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name:'JWT',
    description: 'enter access token',
    in: 'header'
  },"jwt-auth")
  .build();
  const doucument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doucument);
  await app.listen(process.env.PORT);
  console.log('listening on port 3000');
}
bootstrap();
