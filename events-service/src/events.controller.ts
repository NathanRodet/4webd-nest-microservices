import { Controller, Get } from '@nestjs/common';
import { AppService } from './events.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
