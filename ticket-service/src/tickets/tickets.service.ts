import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketsRepository: Repository<Ticket>,
    ) { }

    async getAllTickets(): Promise<Ticket[]> {
        return await this.ticketsRepository.find();
    }

    async getTicketById(id: number): Promise<Ticket> {
        return await this.ticketsRepository.findOne({ where: { id } });
    }

    async createTicket(userId: number, eventId: number): Promise<Ticket> {
        const newTicket = new Ticket();
        newTicket.eventId = eventId;
        newTicket.userId = userId;

        return await this.ticketsRepository.save(newTicket);
    }

    async updateTicket(id: number, userId: number, eventId: number): Promise<Ticket> {
        const ticket = await this.ticketsRepository.findOne({ where: { id } });
        if (ticket) {
            ticket.userId = userId;
            ticket.eventId = eventId; 

            return await this.ticketsRepository.save(ticket);
        }
        else {
            console.log("ticket not found");
        }
        return null;
    }
    async deleteTicket(id: number): Promise<Ticket> {
        const ticket = await this.ticketsRepository.findOne({ where: { id } });
        return await this.ticketsRepository.remove(ticket);
    }


}  