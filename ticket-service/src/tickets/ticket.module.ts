import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketsService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketsService],
})
export class TicketsModule {}
