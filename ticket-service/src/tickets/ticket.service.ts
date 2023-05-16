import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { UpdateTicketDTO } from './dto/update-ticket.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UUID } from './dto/params-ticket.dto';



@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketsRepository: Repository<Ticket>,
    ) { }

    async getAllTickets() {
        return await this.ticketsRepository.find();
    }

    async getTicketById(id: UUID) {
        const ticket = await this.ticketsRepository.findOne({ where: { id: id.id } });
        if (ticket)
            return ticket;
        else {
            throw new HttpException({ message: 'No ticket found for this Id.' }, HttpStatus.NOT_FOUND);
        }
    }

    async createTicket(createTicketDTO: CreateTicketDTO) {
        const ticket = await this.ticketsRepository.findOneBy({
            userId: createTicketDTO.userId,
            eventId: createTicketDTO.eventId,
        });
        if (ticket)
            throw new HttpException({ message: 'User already has a registration for this event.' }, HttpStatus.NOT_FOUND);
        else {
            const newTicket = new Ticket();
            newTicket.eventId = createTicketDTO.eventId;
            newTicket.userId = createTicketDTO.userId;
            return await this.ticketsRepository.save(this.ticketsRepository.create(newTicket));
        }
    }

    async updateTicket(id: UUID, updateTicketDTO: UpdateTicketDTO) {
        if (Object.keys(updateTicketDTO).length == 0)
            throw new HttpException(
                { message: 'Cannot update ticket with null data.' },
                HttpStatus.BAD_REQUEST,
            );

        const ticket = await this.ticketsRepository.findOne({ where: { id: id.id } });
        if (ticket) {
            ticket.userId = updateTicketDTO.userId;
            ticket.eventId = updateTicketDTO.eventId;

            return await this.ticketsRepository.save(ticket);
        }
        else {
            console.log("Ticket not found");
        }
        return null;
    }
    async deleteTicket(id: UUID) {
        const ticket = await this.ticketsRepository.findOne({ where: { id: id.id } });
        if (!ticket)
            throw new HttpException({ message: 'Ticket not found.' }, HttpStatus.NOT_FOUND);

        return await this.ticketsRepository.remove(ticket);
    }
}  