import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {UserModule} from "../routes/user/user.module";
import {LocalStrategy} from "./auth.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {config} from "dotenv";
import * as process from "node:process";
import {JwtStrategy} from "./jwt-strategy";
config({path: '.env.development'});

@Module({
  imports: [
      UserModule,
      PassportModule,
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {expiresIn: '1h'},
      }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
