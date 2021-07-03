import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({ // decorator -> 클래스 위의 함수이고, 클래스를 움직인다.
  imports: [MoviesModule], // 업무 마다 모듈을 임포트 하고 사용한다.(각 모듈별 MVC)
  controllers: [AppController], // 메인 컨트롤러라고 보자.
  providers: [],
})
export class AppModule {}
