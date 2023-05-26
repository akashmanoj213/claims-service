import { Injectable } from '@nestjs/common';
import { ClaimDto, ClaimStatus } from './dto/claim.dto';
import { FirestoreService } from 'src/providers/firestore/firestore.service';

@Injectable()
export class ClaimService {
  readonly CLAIMS_COLLECTION = "claims"

  constructor(
    private firestoreService: FirestoreService
  ) {}

  async create(claim: ClaimDto) {
    // check if policy exists or not
    // check if policy details are as per claims request - Within SumInsures, patient is a insured party
    // check if hospital rates are proper
    claim.claimStatus = ClaimStatus.REVIEW;

    return await this.firestoreService.create<ClaimDto>(this.CLAIMS_COLLECTION, claim);

    // Figure out which TPA to push to and push to appropriate topic (Each TPA has its own topic. The subscriber then takes the data, transforms it and makes API call to TPA)
  }

  findAll() {
    return `This action returns all claim`;
  }

  findOne(id: number) {
    return `This action returns a #${id} claim`;
  }

  async update(id: number, claim: ClaimDto) {
    // The claim data is pulled from a topic. 
    return await this.firestoreService.update<ClaimDto>(this.CLAIMS_COLLECTION, id, claim);

    // Sync changes to PAS to calling partner service
  }

  remove(id: number) {
    return `This action removes a #${id} claim`;
  }
}
