import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {  catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class UsersService {
  private ticketsBaseUrl = 'http://localhost:3001/users';
  private readonly logger = new Logger(UsersService.name);

  constructor(private httpService: HttpService) {}


  async create(UserData: any): Promise<UsersService> {
    
      const { data } = await firstValueFrom(
        this.httpService.post(this.ticketsBaseUrl, UserData).pipe(
          catchError((error: AxiosError) => {
            if (error.response.status === 500) {
              this.logger.error(error.response.data);
              throw new HttpException('Failed to create user', error.response.status);
            }
            console.log(error.response.data);
            throw new HttpException(error.response.data, error.response.status);
            
          }),
        ),
      );
      return data;
    
     
    
  }
  

  async findOne(id: string): Promise<UsersService> {
    
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.ticketsBaseUrl}/${id}`).pipe(
          catchError((error: AxiosError) => {
            if (error.response.status === 500) {
              this.logger.error(error.response.data);
              throw new HttpException(`Failed to find user with id ${id}`, error.response.status);
            }
            throw new HttpException(error.response.data, error.response.status);
          }),
        ),
      );
      return data;
  }
  

  async update(id: string, UserData: any): Promise<UsersService> {
    
      const { data } = await firstValueFrom(
        this.httpService.patch(`${this.ticketsBaseUrl}/${id}`, UserData).pipe(
          catchError((error: AxiosError) => {
            if (error.response.status === 500) {
              this.logger.error(error.response.data);
              throw new HttpException(`Failed to update user with id ${id}`, error.response.status);
            }
            throw new HttpException(error.response.data, error.response.status);
          }),
        ),
      );
      return data;
    
  }
  


  async remove(id: String): Promise<UsersService> {
    const { data } = await firstValueFrom(
      this.httpService.delete(`${this.ticketsBaseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status === 500) {
            this.logger.error(error.response.data);
            throw new HttpException(`Failed to delete user with id ${id}`, error.response.status);
          }
          throw new HttpException(error.response.data, error.response.status);
        }),
      ),
    );
    return data;
  }

  async findAll(): Promise<UsersService> {
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

