import { Module } from '@nestjs/common';
import { AppController } from './events.controller';
import { AppService } from './events.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
