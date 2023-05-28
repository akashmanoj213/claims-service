export class DoctorTreatmentDetailsDto {
    doctorName: string;
    doctorContactNumber: string;
    nameOfDisease: string; // CHECK WITH DISEASE OR ICD CODE ?
    relevantClinicalFindings: string;
    durationOfAilment: number;
    dateOfFirstConsult: Date;
    pastHistoryOfAilment: string;
    provisionalDiagnosis: string;
    ICDCode: string; // Check if ICD code is within insurance coverage
    proposedLineOfTreatment: lineOfTreatment;
    investigationOrMedicalDetails: string;
    routeOfDrugAdministration: string;
    nameOfSurgery: string;
    surgeryICDCode: string; // ANYTHING TO CROSS CHECK HERE ?
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