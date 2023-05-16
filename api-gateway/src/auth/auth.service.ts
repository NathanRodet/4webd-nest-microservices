import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginAuthDto, Token } from './dto/auth.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { GenerateToken } from './utils/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private authURL = 'http://localhost:3001/auth';

  constructor(private httpService: HttpService) { }

  async login(loginData: LoginAuthDto): Promise<Token> {

    const { data } = await firstValueFrom(
      this.httpService.post(this.authURL, loginData).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status === 500) {
            this.logger.error(error.response.data);
            throw new HttpException('Failed to login', error.response.status);
          }
          throw new HttpException(error.response.data, error.response.status);

        }),
      ),
    );

    console.log(data);

    try {
      const token = await GenerateToken({ id: data.id, role: data.role })
      console.log(token);
      return token;
    } catch (error) {
      throw new HttpException({ message: 'Error during token generation' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
