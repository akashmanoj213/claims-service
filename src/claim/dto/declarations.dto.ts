export class DoctorDeclarationDto {
    treatingDoctorName: string;
    qualification: string;
    registrationNumberWithStateCode: string;
    declarationDateTime: Date;
    isSigned: boolean;
}

export class PatientDeclarationDto {
    patientName: string;
    contanctNumber: string;
    emailId: string;
    declarationDateTime: Date;
    isSigned: boolean;
}

export class HospitalDeclarationDto {
    declarationDateTime: Date;
    isSigned: boolean;
}