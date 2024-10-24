import {Controller, Get, Param, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
}