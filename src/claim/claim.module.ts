import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { FirestoreModule } from 'src/providers/firestore/firestore.module';

@Module({
  imports: [FirestoreModule],
  controllers: [ClaimController],
  providers: [ClaimService]
})
export class ClaimModule {}
