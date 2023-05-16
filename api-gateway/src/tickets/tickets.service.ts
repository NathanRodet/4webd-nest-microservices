import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class TicketsService {
  private ticketsBaseUrl = 'http://localhost:3004/ticket';
  private readonly logger = new Logger(TicketsService.name);

  constructor(private httpService: HttpService) { }

  async create(ticketData: any): Promise<TicketsService> {

    const { data } = await firstValueFrom(
      this.httpService.post(this.ticketsBaseUrl, ticketData).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status === 500) {
            this.logger.error(error.response.data);
            throw new HttpException('Failed to create ticket', error.response.status);
          }
          throw new HttpException(error.response.data, error.response.status);

        }),
      ),
    );
    return data;

  }


  async findOne(id: string): Promise<TicketsService> {

    const { data } = await firstValueFrom(
      this.httpService.get(`${this.ticketsBaseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status === 500) {
            this.logger.error(error.response.data);
            throw new HttpException(`Failed to find ticket with id ${id}`, error.response.status);
          }
          throw new HttpException(error.response.data, error.response.status);
        }),
      ),
    );
    return data;
  }


  async update(id: string, ticketData: any): Promise<TicketsService> {

    const { data } = await firstValueFrom(
      this.httpService.patch(`${this.ticketsBaseUrl}/${id}`, ticketData).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status === 500) {
            this.logger.error(error.response.data);
            throw new HttpException(`Failed to update ticket with id ${id}`, error.response.status);
          }
          throw new HttpException(error.response.data, error.response.status);
        }),
      ),
    );
    return data;

  }



  async remove(id: string): Promise<TicketsService> {
    const { data } = await firstValueFrom(
      this.httpService.delete(`${this.ticketsBaseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status === 500) {
            this.logger.error(error.response.data);
            throw new HttpException(`Failed to delete ticket with id ${id}`, error.response.status);
          }
          throw new HttpException(error.response.data, error.response.status);
        }),
      ),
    );
    return data;
  }

  async findAll(): Promise<TicketsService> {
    const { data } = await firstValueFrom(
      this.httpService.get(this.ticketsBaseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }),
      ),
    );
    return data;
  }
}

