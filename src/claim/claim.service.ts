import { Injectable } from '@nestjs/common';
import { ClaimDto, ClaimStatus } from './dto/claim.dto';
import { FirestoreService } from 'src/providers/firestore/firestore.service';
import { PubSubService } from 'src/providers/pub-sub/pub-sub.service';

@Injectable()
export class ClaimService {
  readonly CLAIMS_COLLECTION = "claims"
  readonly NEW_CLAIMS_TOPIC = "claim-requests-tpa1";
  readonly CLAIMS_CHANGES_TOPIC = "claim-changes-pas";

  constructor(
    private firestoreService: FirestoreService,
    private pubSubService: PubSubService,
  ) {}

  async create(claim: ClaimDto) {
    // check if policy exists or not
    // check if policy details are as per claims request - Within SumInsures, patient is a insured party
    // check if hospital rates are proper
    claim.claimStatus = ClaimStatus.REVIEW;

    const savedClaim = await this.firestoreService.create<ClaimDto>(this.CLAIMS_COLLECTION, claim);

    // Figure out which TPA to push to and push to appropriate topic (Each TPA has its own topic. The subscriber then takes the data, transforms it and makes API call to TPA)
    await this.pubSubService.publishMessage(this.NEW_CLAIMS_TOPIC, savedClaim);

    return savedClaim;
  }

  async findAll() {
    return await this.firestoreService.findAll(this.CLAIMS_COLLECTION);
  }

  findOne(id: number) {
    return `This action returns a #${id} claim`;
  }

  async update(id: string, claim: ClaimDto) {
    // The claim data is pulled from a topic. 
    await this.firestoreService.update<ClaimDto>(this.CLAIMS_COLLECTION, id, claim);

    const updatedClaim = await this.firestoreService.findById(this.CLAIMS_COLLECTION, id);

    // Sync changes to PAS to calling partner service
    await this.pubSubService.publishMessage(this.CLAIMS_CHANGES_TOPIC, updatedClaim);
  }

  remove(id: number) {
    return `This action removes a #${id} claim`;
  }
}
