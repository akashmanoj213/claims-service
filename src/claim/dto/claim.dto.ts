import { AccidentDetailsDto } from "./accident-details.dto";
import { DoctorDeclarationDto, HospitalDeclarationDto, PatientDeclarationDto } from "./declarations.dto";
import { DoctorTreatmentDetailsDto } from "./doctor-treatment-details.dto";
import { HospitlDetailsDto } from "./hospital-details.dto";
import { MaternityDetailsDto } from "./maternity-details.dto";
import { PatientAdmissionDetailsDto } from "./patient-admission-details.dto";

export class ClaimDto {
    id: number; // will be generated for new claims
    TPAName: string; // will be calculated based on the patient
    policyNumber: number;
    insuranceCardNumber: number; // might be generated at the time of issuance
    claimStatus: ClaimStatus;
    hospitalDetails: HospitlDetailsDto; // Check if hospital is in Network hospitals
    maternityDetails: MaternityDetailsDto; // Check if insurance covers Maternity
    doctorTreatmentDetails: DoctorTreatmentDetailsDto;
    accidentDetails: AccidentDetailsDto
    patientAdmissionDetails: PatientAdmissionDetailsDto
    patientDeclaration: PatientDeclarationDto; // Check if names in declaration are same as the patient details
    doctorDeclaration: DoctorDeclarationDto; //  Check if names in declaration are same as the doctor details
    hospitalDeclaration: HospitalDeclarationDto;
}

export enum ClaimStatus {
    REVIEW = "review",
    QUERY = "query",
    DENIED = "denied",
    REFERRED = "referred",
    APPROVED = "approved",
    CLOSED = "closed"
}
