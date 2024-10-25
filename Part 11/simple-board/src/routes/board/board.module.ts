import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Board} from "../../entities/board.entity";
import {User} from "../../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Board, User])],
  providers: [BoardService],
  controllers: [BoardController]
})
export class BoardModule {

}
