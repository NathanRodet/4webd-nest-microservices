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
    private eventsRepository: Repository<Event>
  ) { }

  async create(createEventDto: CreateEventDto): Promise<void> {  
    if (await this.eventsRepository.findOneBy({}))
      throw new HttpException({ message: 'Event may already exist' }, HttpStatus.BAD_REQUEST);
    try {
      await this.eventsRepository.save(this.eventsRepository.create(createEventDto))
    } catch (error) {
      console.log(error)
      throw new HttpException({ message: 'Error creating event' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Event[]> {
    return await this.eventsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: string): Promise<void> {


      const event = await this.eventsRepository.findOneBy({ id })
      if (!event) {
        throw new HttpException({ message: 'Event not found' }, HttpStatus.NOT_FOUND);
      }

      try {
        await this.eventsRepository.delete(id);
        console.log("Evenement suprimer.")
      } catch (error) {
        throw new HttpException({ message: 'Error deleting event' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    

      if (!event) {
        throw new HttpException({ message: 'Event not found' }, HttpStatus.NOT_FOUND);
      }

      try {
        await this.eventsRepository.delete(id);
      } catch (error) {
        throw new HttpException({ message: 'Error deleting event' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }

  }
}
