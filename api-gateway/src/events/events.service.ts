import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  private eventsBaseUrl = 'http://localhost:3003/event';
  private readonly logger = new Logger(EventsService.name);

  constructor(private httpService: HttpService) {}


  async create(eventData: any): Promise<EventsService> {
    
      const { data } = await firstValueFrom(
        this.httpService.post(this.eventsBaseUrl, eventData).pipe(
          catchError((error: AxiosError) => {
            if (error.response.status === 500) {
              this.logger.error(error.response.data);
              throw new HttpException('Failed to create event', error.response.status);
            }
            console.log(error.response.data);
            throw new HttpException(error.response.data, error.response.status);
            
          }),
        ),
      );
      return data;
    
     
    
  }
  

  async findOne(id: string): Promise<EventsService> {
    
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.eventsBaseUrl}/${id}`).pipe(
          catchError((error: AxiosError) => {
            if (error.response.status === 500) {
              this.logger.error(error.response.data);
              throw new HttpException(`Failed to find event with id ${id}`, error.response.status);
            }
            throw new HttpException(error.response.data, error.response.status);
          }),
        ),
      );
      return data;
  }
  

  async update(id: string, eventData: any): Promise<EventsService> {
    
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.eventsBaseUrl}/${id}`, eventData).pipe(
          catchError((error: AxiosError) => {
            if (error.response.status === 500) {
              this.logger.error(error.response.data);
              throw new HttpException(`Failed to update event with id ${id}`, error.response.status);
            }
            throw new HttpException(error.response.data, error.response.status);
          }),
        ),
      );
      return data;
    
  }
  


  async remove(id: String): Promise<EventsService> {
    const { data } = await firstValueFrom(
      this.httpService.delete(`${this.eventsBaseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status === 500) {
            this.logger.error(error.response.data);
            throw new HttpException(`Failed to delete event with id ${id}`, error.response.status);
          }
          throw new HttpException(error.response.data, error.response.status);
        }),
      ),
    );
    return data;
  }

  async findAll(): Promise<EventsService> {
    const { data } = await firstValueFrom(
      this.httpService.get(this.eventsBaseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }),
      ),
    );
    return data;
  }
}

