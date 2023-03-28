import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from 'src/core/entities';
import { UserFactoryService } from './user-factory.service';
import { UserUseCases } from './user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserFactoryService, UserUseCases],
  exports: [UserFactoryService, UserUseCases],
})

export class UserUseCasesModule { }