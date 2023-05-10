import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsModule } from './tickets/ticket.module';
import { DataSource } from 'typeorm';
import { Ticket } from './tickets/entities/ticket.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [Ticket],
      synchronize: true,
    }),    TicketsModule
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
