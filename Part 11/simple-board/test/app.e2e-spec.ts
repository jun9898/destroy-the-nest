import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('AppController', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
          .get('/')
          .expect(200)
          .expect('Hello World!');
    });

    it('/name?name=22 (GET)', () => {
      return request(app.getHttpServer())
          .get('/name?name=22')
          .expect(200)
          .expect('22 hello');
    });
  })

  describe('BoardController', () => {
    it('게시글 가져오기', () => {
      return request(app.getHttpServer())
          .get('/name?name=22')
          .expect(200)
    });
  });

  describe('UserController', () => {
    it('로그인', () => {
      return request(app.getHttpServer())
          .post('/login')
          .send({
            username: '22',
            password: '22',
          })
          .expect(201)
    });
  });
});
