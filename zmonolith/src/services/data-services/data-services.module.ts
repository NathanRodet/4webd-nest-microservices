import { Module } from '@nestjs/common';
import { PostgresqlDataServicesModule } from '../../frameworks/data-services/typeorm/typeorm-data.module';

@Module({
  imports: [PostgresqlDataServicesModule],
  exports: [PostgresqlDataServicesModule],
})

export class DataServicesModule { }
