import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { UpdateTicketDTO } from './dto/update-ticket.dto';
import { UUID } from './dto/params-ticket.dto';
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post()
  create(@Body() createTicketDto: CreateTicketDTO) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: UUID) {
    return this.ticketsService.findOne(id.id);
  }

  @Patch(':id')
  update(@Param() id: UUID, @Body() updateTicketDto: UpdateTicketDTO) {
    return this.ticketsService.update(id.id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param() id: UUID) {
    return this.ticketsService.remove(id.id);
  }
}
