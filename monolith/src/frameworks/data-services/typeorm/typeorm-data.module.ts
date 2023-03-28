import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from '../../../core/entities'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})

export class PostgresqlDataServicesModule { }
