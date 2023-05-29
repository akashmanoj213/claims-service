import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { FirestoreModule } from 'src/providers/firestore/firestore.module';
import { PubSubModule } from 'src/providers/pub-sub/pub-sub.module';

@Module({
  imports: [FirestoreModule, PubSubModule],
  controllers: [ClaimController],
  providers: [ClaimService]
})
export class ClaimModule {}
