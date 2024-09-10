import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender, Status } from "../types/GenericTypes";
import { City } from "./City";
import { MonthlyFee } from "./MonthlyFee";
import { Course } from "./Course";
import { Parent } from "./Parent";
import { Tenant } from "./Tenant";
import { Institution } from "./Institution";
import { Subject } from "./Subject";

@Entity("students")
export class Student {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "integer", nullable: false })
    sku!: number;

    @ManyToOne(() => Tenant, { eager: true, cascade: true, onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "tenantId" })
    tenant!: Tenant;

    @ManyToOne(() => Institution, { eager: true, cascade: true, onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "institutionId" })
    instituition!: Institution;

    @Column({ type: "varchar", length: 150, nullable: false })
    firstName!: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    lastName!: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.Active
    })
    status!: Status;

    @Column({ type: "text", nullable: true })
    photoUrl?: string;

    @Column({ type: "varchar", length: 14, nullable: false })
    cpf!: string;

    @Column({ type: "varchar", length: 18, nullable: false })
    rg!: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    nationality!: string;

    @Column({ type: "varchar", length: 10, nullable: false })
    bloodType?: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    email!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    phone?: string;

    @Column({ type: "timestamp", nullable: false })
    birthdate!: Date;

    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.Other
    })
    gender!: Gender;

    @Column({ type: "varchar", length: 150, nullable: true })
    zipCode?: string;

    @ManyToOne(() => City, { nullable: true })
    @JoinColumn({ name: "cityId", referencedColumnName: "id" })
    city?: City;

    @Column({ type: "varchar", length: 200, nullable: true })
    address?: string;

    @Column({ type: "integer", nullable: true })
    addressNumber?: number;

    @Column({ type: "varchar", length: 150, nullable: true })
    neighborhood?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    complement?: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    emergencyContactName?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    emergencyContactPhone?: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    enrollmentDate!: Date;

    @Column({ type: "text", nullable: true })
    medicalConditions?: string;

    @ManyToMany(() => Course, (course) => course.students, { onDelete: "CASCADE", nullable: true })
    @JoinTable()
    courses?: Course[];

    @ManyToMany(() => Subject, (subject) => subject.students, { onDelete: "CASCADE", nullable: true })
    subjects?: Subject[];    

    @ManyToMany(() => Parent, (parent) => parent.students, { cascade: true, onDelete: "CASCADE", nullable: true })
    @JoinTable()
    parents?: Parent[];

    @OneToMany(() => MonthlyFee, monthlyFee => monthlyFee.student, { cascade: true, onDelete: "CASCADE", nullable: true })
    monthlyFees?: MonthlyFee[];

    @Column({ type: "text", nullable: true })
    notes?: string;

}