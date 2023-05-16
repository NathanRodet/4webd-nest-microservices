import { Controller, Headers, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { UpdateTicketDTO } from './dto/update-ticket.dto';
import { UUID } from './dto/params-ticket.dto';
import { Roles } from '../auth/guards/auth.decorator';
import { Role } from '../auth/guards/auth.enum';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post()
  @Roles(Role.USER)
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
  @Roles(Role.ADMIN)
  update(@Param() id: UUID, @Body() updateTicketDto: UpdateTicketDTO, @Headers() headers: any) {
    return this.ticketsService.update(id.id, updateTicketDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param() id: UUID, @Headers() headers: any) {
    return this.ticketsService.remove(id.id);
  }
}
