import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlantTitle, SubscriptionType, UserType } from "../types/GenericTypes";
import { Plan } from "./Plan";

@Entity("tenants")
export class Tenant {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name!: string;

    @Column({ type: "varchar", length: 200, nullable: false })
    email!: string;

    @Column({ type: "varchar", length: 200, nullable: false })
    password!: string;

    @Column({ type: "text", nullable: true })
    photoUrl?: string;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.Guest,
        nullable: false
    })
    type!: UserType;

    @Column({
        type: 'enum',
        enum: SubscriptionType,
        default: SubscriptionType.Active,
        nullable: true
    })
    subscriptionStatus?: SubscriptionType;

    @ManyToOne(() => Plan, { cascade: true, onDelete: "CASCADE", nullable: true })
    subscriptionPlan!: Plan;

    @Column({
        type: 'enum',
        enum: PlantTitle,
        default: PlantTitle.Other,
        nullable: false
    })
    subscriptionType!: PlantTitle;

    @Column({ type: "timestamp", nullable: true})
    subscriptionStartDate?: Date;

    @Column({ type: "timestamp", nullable: true})
    subscriptionEndDate?: Date;

    @Column({ type: "timestamp", nullable: true })
    subscriptionRenewal?: Date;

    @Column({ type: "timestamp", nullable: true })
    subscriptionExpiration?: Date;

    @Column({ type: 'int', nullable: false })
    currentStudents!: number;

    @Column({ type: 'int', nullable: false })
    currentInstitutions!: number;

    @Column({ type: 'int', nullable: false })
    currentCourses!: number;

    @Column({ type: 'int', nullable: false })
    currentTeacher!: number;

    @Column({ type: 'int', nullable: false })
    currentUsers!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt?: Date;

}