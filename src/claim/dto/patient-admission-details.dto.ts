export class PatientAdmissionDetailsDto {
    patientFullName: string;
    patientGender: string;
    patientDob: Date;
    dateAndTimeOfAdmission: Date;
    contactNumber: number;
    alternateContactNumber: number;
    isEmergencyHospitalisation: boolean;
    isPlannedHospitalisation: boolean;
    expectedNumberOfDaysStay: number;
    expectedDaysInICU: number;
    roomType: string;
    roomNursingPatiendDietCharges: number;
    expectedInvestigationDiagnosticsCost: number;
    ICUCharges: number;
    OTCharges: number;
    professionalAnestheticFeesCosultationCharges: number;
    medicineConsumableImplantCharges: number;
    otherHospitalExpenses: number;
    allInclusivePackageCharges: number;
    sumTotalExpectedHospitalisationCost: number;
    pastHistoryOfChronicIllnes: Array<PastChronicIllness>
}

export class PastChronicIllness {
    illnesName: string;
    illnessStartDate: Date;
}