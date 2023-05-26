import { AccidentDetailsDto } from "./accident-details.dto";
import { DoctorDeclarationDto, HospitalDeclarationDto, PatientDeclarationDto } from "./declarations.dto";
import { DoctorTreatmentDetailsDto } from "./doctor-treatment-details.dto";
import { HospitlDetailsDto } from "./hospital-details.dto";
import { MaternityDetailsDto } from "./maternity-details.dto";
import { PatientAdmissionDetailsDto } from "./patient-admission-details.dto";

export class ClaimDto {
    id: number;
    TPAName: string;
    policyNumber: number;
    insuranceCardNumber: number;
    claimStatus: ClaimStatus;
    hospitalDetails: HospitlDetailsDto;
    maternityDetaisl: MaternityDetailsDto;
    doctorTreatmentDetails: DoctorTreatmentDetailsDto;
    accidentDetails: AccidentDetailsDto
    patientAdmissionDetails: PatientAdmissionDetailsDto
    hospitalDeclaration: HospitalDeclarationDto;
    doctorDeclaration: DoctorDeclarationDto;
    patientDeclaration: PatientDeclarationDto;
}

export enum ClaimStatus {
    REVIEW = "review",
    QUERY = "query",
    DENIED = "denied",
    REFERRED = "referred",
    APPROVED = "approved",
    CLOSED = "closed"
}
