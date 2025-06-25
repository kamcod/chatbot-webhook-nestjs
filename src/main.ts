import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for webhook calls
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT || 8000;
  await app.listen(port);
  console.log(`🚀 Webhook server is running on: http://localhost:${port}`);
  console.log(`📡 Webhook endpoint: http://localhost:${port}/webhook`);
}
bootstrap(); 