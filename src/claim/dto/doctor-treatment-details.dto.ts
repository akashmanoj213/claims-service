export class DoctorTreatmentDetailsDto {
    doctorName: string;
    doctorContactNumber: number;
    nameOfDisease: string;
    relevantClinicalFindings: string;
    durationOfAilment: number;
    dateOfFirstConsult: Date;
    pastHistoryOfAilment: string;
    provisionalDiagnosis: string;
    ICDCode: string;
    proposedLineOfTreatment: lineOfTreatment;
    investigationOrMedicalDetails: string;
    routeOfDrugAdministration: string;
    nameOfSurgery: string;
    surgeryICDCode: string;
    otherTreatmentDetails: string;
    InjuryReason: string;
}

export enum lineOfTreatment {
    MEDICAL_MANAGEMENT = "Medical Management",
    SURGICAL_MANAGEMENT = "Surgical Management",
    INTENSIVE_CARE = "Intensive Care",
    INVESTIGATION = "Investigatoin",
    NONALLOPATHICTREATMENT = "Non-Allopathic treatment"
}