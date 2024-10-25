import {Controller, Get, Param, Post, Query, Request, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {ConfigService} from "@nestjs/config";
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly configService: ConfigService,
      private readonly authService: AuthService,
  ) {}


  @Get()
  getHello(
  ): string {
    console.log(this.configService.get('ENVIRONMENT'));
    return 'Hello World!';
  }

  @Get('name/:name')
  getName(
      @Param('name') name: string
  ): string {
    return `${name} hello`
  }

  @Get('name')
  getQueryName(
      @Query('name') name: string
  ): string {
    return `${name} hello`
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}