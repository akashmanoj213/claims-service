import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimModule } from './claim/claim.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalPricingDetails } from './claim/entities/HospitalPricingDetails.entity';
import { HospitalRateChart } from './claim/entities/HospitalRateChart.entity';

@Module({
  imports: [ClaimModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: '/cloudsql/pruinhlth-nprd-dev-scxlyx-7250:asia-south1:sahi-dev',
    // host: 'localhost',
    port: 5432,
    username: 'sahi-user',
    password: 'qwerty',
    // username: 'postgres',
    // password: 'qwerty',
    database: 'Claims',
    entities: [HospitalPricingDetails, HospitalRateChart],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
