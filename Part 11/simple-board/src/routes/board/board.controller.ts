import {
    Body,
    Controller,
    Delete,
    Get,
    Injectable,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Request, UseGuards,
    ValidationPipe
} from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {UserInfo} from "../../decorators/user-info.decorator";
import {JwtPayload} from "jsonwebtoken";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('board')
@ApiTags('Board')
export class BoardController {
    constructor(
        private readonly boardService: BoardService,
    ){}

    @Get()
    findAll() {
        return this.boardService.findAll();
        
    }

    @Get(':id')
    find(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.boardService.find(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(
        @UserInfo() userInfo: JwtPayload,
        @Body('contents') contents: string,
    ) {
        if (!userInfo) throw new Error('로그인이 필요합니다.');
        return this.boardService.create({
            userId: userInfo.id,
            contents: contents,
        });
    }

    @Put(':id')
    update(
        @UserInfo() userInfo: JwtPayload,
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateBoardDto
    ) {
        return this.boardService.update(userInfo.id, id, data);
    }


    @Delete(':id')
    remove(
        @UserInfo() userInfo: JwtPayload,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.boardService.delete(userInfo.id, id);
    }
}