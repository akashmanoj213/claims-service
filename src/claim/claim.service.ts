import { Injectable } from '@nestjs/common';
import { ClaimDto, ClaimStatus, ClaimType } from './dto/claim.dto';
import { FirestoreService } from 'src/providers/firestore/firestore.service';
import { PubSubService } from 'src/providers/pub-sub/pub-sub.service';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalPricingDetails } from './entities/HospitalPricingDetails.entity';
import { Repository } from 'typeorm';
import { HospitalRateChart } from './entities/HospitalRateChart.entity';

@Injectable()
export class ClaimService {
  readonly CLAIMS_COLLECTION = "claims"
  readonly NEW_CLAIMS_TOPIC = "claim-requests-tpa1";
  readonly CLAIMS_CHANGES_TOPIC = "claim-changes-pas";

  constructor(
    @InjectRepository(HospitalPricingDetails)
    private hospitalPricingDetailsRepository: Repository<HospitalPricingDetails>,
    @InjectRepository(HospitalRateChart)
    private hospitalRateChartRepository: Repository<HospitalRateChart>,
    private firestoreService: FirestoreService,
    private pubSubService: PubSubService,
  ) { }

  async create(claim: ClaimDto) {
    // check if policy exists or not
    // check if policy details are as per claims request - Within SumInsured, patient is a insured party
    claim.claimStatus = ClaimStatus.REVIEW;

    const { claimType } = claim;

    // Perform hospital rate check if cashless claim request
    if (claimType === ClaimType.CASHLESS) {
      const isValid = await this.claimDataValidation(claim);

      // If rates are higher than agreed upon, launch a query to check with the hospital
      if(!isValid) {
        claim.claimStatus = ClaimStatus.QUERY;
      }
    }

    const savedClaim = await this.firestoreService.create<ClaimDto>(this.CLAIMS_COLLECTION, claim);

    // Figure out which TPA to push to and push to appropriate topic (Each TPA has its own topic. The subscriber then takes the data, transforms it and makes API call to TPA)
    // Pushing to new_claims topic but will be replaced with pushBucket function
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

  async claimDataValidation(claim) {
    const { hospitalDetails: { hospitalId }, doctorTreatmentDetails: { ICD11Code, },
      patientAdmissionDetails: { ICUCharges, OTCharges, expectedDaysInICU, expectedNumberOfDaysStay, expectedInvestigationDiagnosticsCost,
        medicineConsumableImplantCharges, professionalAnestheticFeesCosultationCharges, roomNursingPatientDietCharges,
        allInclusivePackageCharges, otherHospitalExpenses, sumTotalExpectedHospitalisationCost, roomType } } = claim;

    if (!hospitalId) {
      throw new Error("hospitalId is required to raise cashless claim!");
    }

    // Check if hospital exists by pulling data from hospital service

    let hospitalDetails = await this.hospitalPricingDetailsRepository.findOne({
      where: {
        hospitalId
      }
    });

    if (!hospitalDetails) {
      throw new Error(`hospital with hospitalId: ${hospitalId} is not found!`);
    }

    let hospitalRateChart = await this.hospitalRateChartRepository.findOne({
      where: {
        ICD11Code,
        hospitalId
      }
    });

    if (!hospitalRateChart) {
      throw new Error(`No rate chart found for ICDCode: ${ICD11Code} at hospitalId: ${hospitalId}!`);
    }

    const { roomNursingPatientDietCharges: agreedRoomNursingPatiendDietCharges, ICUCharges: agreedICUCharges, professionalAnestheticFeesCosultationCharges: agreedFeesFeesCosultationCharges,
      OTCharges: agreedOTCharges, ACRoomRent, nonACRoomRent } = hospitalDetails;

    const { expectedDaysInICU: agreedExpectedDaysInICU, expectedNumberOfDaysStay: agreedExpectedNumberOfDaysStay, expectedInvestigationDiagnosticsCost: agreedExpectedInvestigationDiagnosticsCost,
      medicineConsumableImplantCharges: agreedMedicineConsumableImplantCharges,
      allInclusivePackageCharges: agreedAllInclusivePackageCharges, otherHospitalExpenses: agreedOtherHospitalExpenses } = hospitalRateChart;

    if (expectedDaysInICU > agreedExpectedDaysInICU || expectedNumberOfDaysStay > agreedExpectedNumberOfDaysStay || expectedInvestigationDiagnosticsCost > agreedExpectedInvestigationDiagnosticsCost ||
      medicineConsumableImplantCharges > agreedMedicineConsumableImplantCharges || allInclusivePackageCharges > agreedAllInclusivePackageCharges || otherHospitalExpenses > agreedOtherHospitalExpenses ||
      roomNursingPatientDietCharges > agreedRoomNursingPatiendDietCharges || ICUCharges > agreedICUCharges || professionalAnestheticFeesCosultationCharges > agreedFeesFeesCosultationCharges ||
      OTCharges > agreedOTCharges) {
      return false;
    }

    return true;
  }

  async pushToBucket() {
    // Based on the status of the claim - REVIEW, QUERY, APPROVED, REJECTED, push to appropriate topics
    // Each subscriber will initiate a workflow based on the claim status
  }

  remove(id: number) {
    return `This action removes a #${id} claim`;
  }
}
