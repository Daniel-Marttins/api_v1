import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";
import { Grade } from "./Grade";

@Entity('subjects')
export class Subject {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    title!: string;

    @Column({ type: 'text', nullable: true })
    image?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @ManyToMany(() => Student, (student) => student.subjects, { cascade: true, onDelete: "CASCADE", nullable: true })
    @JoinTable()
    students?: Student[];

    @OneToMany(() => Grade, (grade) => grade.subject)
    grades?: Grade[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt?: Date;

}