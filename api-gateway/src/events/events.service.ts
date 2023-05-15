import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosError } from 'axios';

@Injectable()
export class EventsService {
  private eventsBaseUrl = 'http://localhost:3003/event';
  private readonly logger = new Logger(EventsService.name);

  constructor(private httpService: HttpService) {}


  async create(eventData: any): Promise<Event> {
    
      const { data } = await firstValueFrom(
        this.httpService.post<Event>(this.eventsBaseUrl, eventData).pipe(
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
  

  async findOne(id: string): Promise<Event> {
    
      const { data } = await firstValueFrom(
        this.httpService.get<Event>(`${this.eventsBaseUrl}/${id}`).pipe(
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
  

  async update(id: string, eventData: any): Promise<Event> {
    
      const { data } = await firstValueFrom(
        this.httpService.patch<Event>(`${this.eventsBaseUrl}/${id}`, eventData).pipe(
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
  


  async remove(id: String): Promise<Event> {
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

  async findAll(): Promise<Event> {
    const { data } = await firstValueFrom(
      this.httpService.get<Event>(this.eventsBaseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }),
      ),
    );
    return data;
  }
}

