import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    /**
     * 테스트에도 똑같은 환경을 만들어 주어야 에러가 나지 않는다. 
     * main.ts 처럼 똑같이 미들웨어 등록
     */
    app.useGlobalPipes( // 미들웨어 파이프 (ValidationPipe 유효성 검사) class-validator, class-transformer
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true, // dto 에 없는 필드는 올 수 없다.
        transform: true, // 파라메터 타입 변환을 해준다. (예를 들어 id 값을 1로 사용자가 보내면 스트링으로 받는데 이 것을 자동으로 number로 바꿔준다.)
      }) 
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: "Test",
          year: 2020,
          genres: ['test']
        })
        .expect(201);
    });

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404)
    })
  })

  describe('/movies/:id', () => {
    it("GET 200", () => {
      return request(app.getHttpServer())
        .get("/movies/1")
        .expect(200)
    });

    it("GET 404", () => {
      return request(app.getHttpServer())
        .get("/movies/999")
        .expect(404)
    })

    it("PATCH 200", () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .send({
          title: 'Updated Test'
        })
        .expect(200)
    })

    it("DELETE 200", () => {
      return request(app.getHttpServer())
        .delete("/movies/1")
        .expect(200)
    })

    // it.todo("DELETE")
    // it.todo("PATCH")
  })
});
