import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    titre?: string;
    description?: string;
    DateDebut?: Date;
    DateFin?: Date;
    ticketsDisponible?: number;
}
