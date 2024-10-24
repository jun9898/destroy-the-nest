import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {BoardService} from "./board.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Board')
@Controller('board')
export class BoardController {
    constructor(
        private readonly boardService: BoardService
    ) {}


    @Get()
    findAll() {
        return this.boardService.findAll();
    }

    @Get(':id')
    find(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.boardService.findOne(id);
    }

    @Post()
    create(
        @Body() body: any
    ) {
        return this.boardService.create(body);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any
    ) {
        return this.boardService.update(id, body);
    }

    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.boardService.delete(id);
    }
}
