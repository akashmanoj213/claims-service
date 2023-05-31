import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { HospitalRateChart } from "./HospitalRateChart.entity";

@Entity()
export class HospitalPricingDetails {
    @Column()
    @Generated()
    id?: number;
    @PrimaryColumn()
    hospitalId?: number;
    @Column()
    ICUCharges: number;
    @Column()
    OTCharges: number;
    @Column()
    ACRoomRent: number;
    @Column()
    nonACRoomRent: number;
    @Column()
    roomNursingPatientDietCharges: number;
    @Column()
    professionalAnestheticFeesCosultationCharges: number;
    @CreateDateColumn()
    createdAt?: Date;
    @UpdateDateColumn()
    updatedAt?: Date;
}