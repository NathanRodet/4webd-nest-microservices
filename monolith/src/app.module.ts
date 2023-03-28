import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { UserController } from './controllers/user.controller';
import { DataServicesModule } from './services/data-services/data-services.module';
import { UserUseCasesModule } from './use-cases/users/user-use-cases.module';

@Module({
  imports: [
    DataServicesModule,
    UserUseCasesModule,
  ],
  controllers: [
    AppController,
    UserController,
  ],
  providers: [],
})

export class AppModule { }
