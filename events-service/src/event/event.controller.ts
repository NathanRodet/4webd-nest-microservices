import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Headers, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import stripe from 'stripe';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
  
  @Get('buy/:id')
  getLink(@Param('id') id: string) {
    return this.eventService.getLink(id);
  }
  @Post('hook')
  @HttpCode(HttpStatus.OK)
  async handleRequest(@Body() body :any, @Headers() headers) {
    return this.eventService.handleRequest(body, headers);
  }
}