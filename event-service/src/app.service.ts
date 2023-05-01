import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async healthCheck(): Promise<void> {
    return null;
  }
}
