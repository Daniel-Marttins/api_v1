import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PlanType } from "../types/GenericTypes";

@Entity('plans')
export class Plan {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    title!: string;

    @Column({ type: 'text'})
    description!: string;

    @Column({
        type: 'enum',
        enum: PlanType,
        default: PlanType.Other,
        nullable: true
    })
    planType?: PlanType;

    @Column({ type: "varchar", length: 100, default: 'ob_free', nullable: false })
    planSlug!: string;

    @Column({ type: "decimal",  precision: 10, scale: 2, nullable: true })
    price!: number;

    @Column({ type: "decimal",  precision: 10, scale: 2, nullable: true })
    promotionPrice?: number;

    @Column({ type: 'int', nullable: false })
    duration!: number;

    @Column({ type: 'int', nullable: false })
    maxStudents!: number;

    @Column({ type: 'int', nullable: false })
    maxInstitutions!: number;

    @Column({ type: 'int', nullable: false })
    maxCourses!: number;

    @Column({ type: 'int', nullable: false })
    maxTeacher!: number;

    @Column({ type: 'int', nullable: false })
    maxUsers!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt!: Date;
    
}