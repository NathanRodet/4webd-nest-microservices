import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  async healthCheck(): Promise<void> {
    return Promise.resolve();
  }

}