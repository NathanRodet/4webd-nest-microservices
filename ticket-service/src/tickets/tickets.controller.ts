import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Ticket } from './ticket.model';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Get()
    async getAllTickets(): Promise<Ticket[]> {
        return await this.ticketsService.getAllTickets();
    }

    @Get(':id')
    async getTicketById(@Param('id') id: number): Promise<Ticket> {
        return this.ticketsService.getTicketById(id);
    }

    @Post()
    async createTicket(@Body('userId') userId: number, @Body('eventId') eventId: number): Promise<Ticket> {
        return this.ticketsService.createTicket(userId, eventId);
    }

    @Put(':id')
    async updateTicket(@Param('id') id: number, @Body('userId') userId: number, @Body('eventId') eventId: number): Promise<Ticket> {
        return this.ticketsService.updateTicket(id, userId, eventId);
    }

     @Delete(':id')
     async deleteTicket(@Param('id') id: number): Promise<Ticket> {
         return this.ticketsService.deleteTicket(id);
 }
}