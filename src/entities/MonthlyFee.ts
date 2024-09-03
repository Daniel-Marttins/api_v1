import { Column, Entity, JoinColumn, JsonContains, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";
import { PaymentStatus } from "../types/GenericTypes";
import { Course } from "./Course";
import { Tenant } from "./Tenant";

@Entity("monthlyFees")
export class MonthlyFee {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "integer", nullable: false })
    sku!: number;

    @ManyToOne(() => Tenant, { eager: true, cascade: true, onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "tenantId" })
    tenantId!: Tenant;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.Paid
    })
    status!: PaymentStatus;

    @Column({ type: "integer", nullable: true})
    referenceNumber?: number;

    @Column({ type: "varchar", length: 150, nullable: true })
    description?: string;

    @ManyToOne(() => Student, student => student.monthlyFees, { nullable: false })
    @JoinColumn({ name: "studentId", referencedColumnName: "id" })
    studentId!: Student;

    @ManyToOne(() => Course, { nullable: false })
    @JoinColumn({ name: "courseId", referencedColumnName: "id" })
    courseId!: Course;

    @Column({ type: "timestamp", nullable: false})
    dueDate!: Date;

    @Column({ type: "timestamp", nullable: true })
    paymentDate?: Date;

    @Column({ type: "decimal",  precision: 10, scale: 2, nullable: true })
    discount?: number;

    @Column({ type: "decimal",  precision: 10, scale: 2, nullable: true })
    penalty?: number;

    @Column({ type: "decimal",  precision: 10, scale: 2, nullable: false })
    amount!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt?: Date;

    @Column({ type: "text", nullable: true })
    notes?: string;

}