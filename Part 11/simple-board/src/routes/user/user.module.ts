import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Board} from "../../entities/board.entity";
import {User} from "../../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Board, User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
