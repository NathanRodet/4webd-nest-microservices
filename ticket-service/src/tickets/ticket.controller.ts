import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './ticket.service';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { UpdateTicketDTO } from './dto/update-ticket.dto';
import { UUID } from './dto/params-ticket.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketsService) { }

  @Get()
  findAll() {
    return this.ticketService.getAllTickets();
  }
  @Post()
  create(@Body() createTicketDTO: CreateTicketDTO) {
    return this.ticketService.createTicket(createTicketDTO);
  }

  @Get(':id')
  findOne(@Param() id: UUID) {
    return this.ticketService.getTicketById(id);
  }

  @Patch(':id')
  update(@Param() id: UUID, @Body() updateTicketDTO: UpdateTicketDTO) {
    return this.ticketService.updateTicket(id, updateTicketDTO);
  }

  @Delete(':id')
  remove(@Param() id: UUID) {
    return this.ticketService.deleteTicket(id);
  }
}
