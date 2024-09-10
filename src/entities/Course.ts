import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CourseModel, CourseType, EducationLevel } from "../types/GenericTypes";
import { Student } from "./Student";
import { Tenant } from "./Tenant";
import { Institution } from "./Institution";

@Entity("courses")
export class Course {

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

    @Column({ type: "varchar", length: 255, nullable: false })
    code!: string;

    @Column({
        type: 'enum',
        enum: EducationLevel,
        default: EducationLevel.Other,
        nullable: false
    })
    level!: EducationLevel;

    @Column({
        type: 'enum',
        enum: CourseModel,
        default: CourseModel.Other,
        nullable: false
    })
    model!: CourseModel;

    @Column({
        type: 'enum',
        enum: CourseType,
        default: CourseType.Other,
        nullable: false
    })
    type!: CourseType;

    @Column({ type: "varchar", length: 255, nullable: false })
    name!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "int", nullable: false })
    duration!: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    schedule?: string;

    @ManyToMany(() => Student, (student) => student.courses)
    students?: Student[];

    @Column({ type: "integer", nullable: true })
    capacity?: number;

    @Column({ type: "integer", nullable: false })
    enrolledStudents?: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price!: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    feeAmount!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt?: Date;

    @Column({ type: "text", nullable: true })
    notes?: string;

}