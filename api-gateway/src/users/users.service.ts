import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private usersBaseURL = 'http://localhost:3001/users';
  private adminBaseURL = 'http://localhost:3001/admin';
  private readonly logger = new Logger(UsersService.name);

  constructor(private httpService: HttpService) { }


  async create(UserData: CreateUserDto): Promise<UsersService> {

    const { data } = await firstValueFrom(
      this.httpService.post(this.usersBaseURL, UserData).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status === 500) {
            this.logger.error(error.response.data);
            throw new HttpException('Failed to create user', error.response.status);
          }
          throw new HttpException(error.response.data, error.response.status);

        }),
      ),
    );
    return data;
  }

  async createAdmin(UserData: CreateUserDto): Promise<UsersService> {

    const { data } = await firstValueFrom(
      this.httpService.post(this.adminBaseURL, UserData).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status === 500) {
            this.logger.error(error.response.data);
            throw new HttpException('Failed to create user', error.response.status);
          }
          throw new HttpException(error.response.data, error.response.status);

        }),
      ),
    );
    return data;
  }


  async findOne(id: string): Promise<UsersService> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.usersBaseURL}/${id}`).pipe(
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
      this.httpService.patch(`${this.usersBaseURL}/${id}`, UserData).pipe(
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



  async remove(id: string): Promise<UsersService> {
    const { data } = await firstValueFrom(
      this.httpService.delete(`${this.usersBaseURL}/${id}`).pipe(
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
      this.httpService.get(this.usersBaseURL).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }),
      ),
    );
    return data;
  }
}

