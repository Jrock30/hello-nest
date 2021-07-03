import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( // 미들웨어 파이프 (ValidationPipe 유효성 검사) class-validator, class-transformer
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // dto 에 없는 필드는 올 수 없다.
      transform: true, // 파라메터 타입 변환을 해준다. (예를 들어 id 값을 1로 사용자가 보내면 스트링으로 받는데 이 것을 자동으로 number로 바꿔준다.)
    }) 
  );
  await app.listen(3000);
}
bootstrap();
