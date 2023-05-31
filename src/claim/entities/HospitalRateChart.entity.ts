import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HospitalPricingDetails } from "./HospitalPricingDetails.entity";

@Entity()
export class HospitalRateChart {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    ICD11Code: string;
    @Column()
    diagnosisName: string;
    @Column()
    expectedInvestigationDiagnosticsCost: number;
    @Column()
    medicineConsumableImplantCharges: number;
    @Column()
    otherHospitalExpenses: number;
    @Column()
    allInclusivePackageCharges: number;
    @Column()
    expectedNumberOfDaysStay: number;
    @Column()
    expectedDaysInICU: number;
    @CreateDateColumn()
    createdAt?: Date;
    @UpdateDateColumn()
    updatedAt?: Date;
    @Column({ nullable: true })
    hospitalId: number
    @ManyToOne(type => HospitalPricingDetails)
    @JoinColumn({ name: "hospitalId" })
    hospitalPricingDetails?: HospitalPricingDetails
}