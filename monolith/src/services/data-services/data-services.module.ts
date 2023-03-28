import { Module } from '@nestjs/common';
import { PostgresqlDataServicesModule } from '../../frameworks/data-services/postgresql/postgresql-data-services.modules';

@Module({
  imports: [PostgresqlDataServicesModule],
  exports: [PostgresqlDataServicesModule],
})

export class DataServicesModule { }
