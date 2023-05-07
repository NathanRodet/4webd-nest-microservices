import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import Event from './entities/event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<void> {
    if (await this.eventsRepository.findOneBy({ titre: createEventDto.titre }))
      throw new HttpException(
        { message: 'Event may already exist' },
        HttpStatus.BAD_REQUEST,
      );
    try {
      await this.eventsRepository.save(
        this.eventsRepository.create(createEventDto),
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: 'Error creating event' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Event[]> {
    return await this.eventsRepository.find();
  }

  async findOneById(id: string) {
    const event = await this.eventsRepository.findOneBy({ id });
    if (!event)
      throw new HttpException(
        { message: 'Event not found.' },
        HttpStatus.NOT_FOUND,
      );
    else return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.eventsRepository.findOneBy({ id });
    if (!event)
      throw new HttpException(
        { message: 'Event not found.' },
        HttpStatus.NOT_FOUND,
      );
    else {
      const eventData = {
        titre: updateEventDto.titre,
        description: updateEventDto.description,
        dateDebut: updateEventDto.DateDebut,
        dateFin: updateEventDto.DateFin,
        ticketsDisponible: updateEventDto.ticketsDisponible,
      };
      return await this.eventsRepository.update({ id }, eventData);
    }
  }

  async remove(id: string) {
    const event = await this.eventsRepository.findOneBy({ id });
    if (!event)
      throw new HttpException(
        { message: 'Event not found.' },
        HttpStatus.NOT_FOUND,
      );
    else return await this.eventsRepository.delete({ id });
  }
}
