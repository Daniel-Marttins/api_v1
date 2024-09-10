import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";
import { Subject } from "./Subject";

@Entity('grades')
export class Grade {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'integer', nullable: false })
    period!: number;
    
    @Column({ type: 'varchar', length: 150, nullable: false })
    periodTitle!: string;

    @ManyToOne(() => Student, { cascade: true, onDelete: "CASCADE", nullable: true })
    student!: Student;
    
    @ManyToOne(() => Subject, { cascade: true, onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: 'subjectId' })
    subject!: Subject;

    @Column({ type: 'integer', nullable: false })
    grade!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt?: Date;
    
}