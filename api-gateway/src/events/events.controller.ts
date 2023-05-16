import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UUID } from './dto/params-event.dto';
import { Roles } from '../auth/guards/auth.decorator';
import { Role } from '../auth/guards/auth.enum';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  @Roles(Role.USER)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: UUID) {
    return this.eventsService.findOne(id.id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param() id: UUID, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id.id, updateEventDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param() id: UUID) {
    return this.eventsService.remove(id.id);
  }
}
