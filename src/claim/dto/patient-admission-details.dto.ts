export class PatientAdmissionDetailsDto {
    patientFullName: string;
    patientGender: string;
    patientDob: Date;
    dateAndTimeOfAdmission: Date;
    contactNumber: string;
    alternateContactNumber: string;
    isEmergencyHospitalisation: boolean;
    isPlannedHospitalisation: boolean;
    expectedNumberOfDaysStay: number; // is this part of hospital data
    expectedDaysInICU: number; // is this part of hosptial data
    roomType: string; // is this part of hospital data
    roomNursingPatiendDietCharges: number; // is this part of hospital data
    expectedInvestigationDiagnosticsCost: number; // is this part of hospital data
    ICUCharges: number; // is this part of hospital data
    OTCharges: number; // is this part of hospital data
    professionalAnestheticFeesCosultationCharges: number; // is this part of hospital data
    medicineConsumableImplantCharges: number; // is this part of hospital data
    otherHospitalExpenses: number; // is this part of hospital data
    allInclusivePackageCharges: number; // is this part of hospital data? IF THIS IS PART OF A PACKAGE THEN ARE THERE STILL INDIVIDUAL CHARGES ALLOTED ?
    sumTotalExpectedHospitalisationCost: number; // is this part of hospital data? IF PACKAGE THEN WILL THIS BE SAME AS PACKAGE ?
    pastHistoryOfChronicIllnes: Array<PastChronicIllness>
}

export class PastChronicIllness {
    illnesName: string;
    illnessStartDate: Date;
}