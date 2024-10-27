import {Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "../../entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    signup(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    getUsers() {
        return this.userService.getUsers();
    }
}
