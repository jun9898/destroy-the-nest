import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './routes/board/board.module';
import {LoggingMiddleware} from "./middlewares/logging.middleware";
import ConfigModule from "./config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './routes/user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      ConfigModule(),
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'admin',
          password: 'admin',
          database: 'postgres',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          logging: true
      }),
      BoardModule,
      UserModule,
      AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggingMiddleware).forRoutes('*');
    }
}
