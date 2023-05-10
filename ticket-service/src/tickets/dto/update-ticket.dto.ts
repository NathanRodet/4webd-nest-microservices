import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDTO } from './create-ticket.dto';

export class UpdateTicketDTO extends PartialType(CreateTicketDTO) {
  userId?: string;
  eventId?: string; 
}
