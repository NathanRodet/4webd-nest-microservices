import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UUID } from './dto/params-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findOneById(@Param() id: UUID) {
    return this.eventService.findOneById(id.id);
  }

  @Patch(':id')
  async update(@Param() id: UUID, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id.id, updateEventDto);
  }

  @Delete(':id')
  async remove(@Param() id: UUID) {
    return this.eventService.remove(id.id);
  }
}
