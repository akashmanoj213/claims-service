import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { FirestoreModule } from 'src/providers/firestore/firestore.module';
import { PubSubModule } from 'src/providers/pub-sub/pub-sub.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalPricingDetails } from './entities/HospitalPricingDetails.entity';
import { HospitalRateChart } from './entities/HospitalRateChart.entity';

@Module({
  imports: [FirestoreModule, PubSubModule,
    TypeOrmModule.forFeature([HospitalPricingDetails, HospitalRateChart]),
  ],
  controllers: [ClaimController],
  providers: [ClaimService]
})
export class ClaimModule {}
