import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsModule } from './tickets/ticket.module';
import { DataSource } from 'typeorm';
import { Ticket } from './tickets/entities/ticket.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';


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
    }), TicketsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
