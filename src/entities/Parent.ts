import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParentRelationship, PreferenceContact } from "../types/GenericTypes";
import { Student } from "./Student";
import { City } from "./City";
import { Tenant } from "./Tenant";

@Entity("parents")
export class Parent {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "integer", nullable: false })
    sku!: number;

    @ManyToOne(() => Tenant, { eager: true, cascade: true, onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "tenantId" })
    tenantId!: Tenant;

    @Column({ type: "varchar", length: 150, nullable: false })
    firstName!: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    lastName!: string;

    @Column({ type: "varchar", length: 14, nullable: false })
    cpf!: string;

    @Column({
        type: 'enum',
        enum: ParentRelationship,
        default: ParentRelationship.Other,
        nullable: false
    })    
    relationships!: ParentRelationship;

    @Column({
        type: 'enum',
        enum: PreferenceContact,
        default: PreferenceContact.Other,
        nullable: false
    })    
    preferredContactMethod!: PreferenceContact;

    @Column({ type: "boolean", default: true })
    emergencyContact!: boolean;

    @Column({ type: "varchar", length: 150, nullable: true })
    email?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    phone?: string;
    
    @Column({ type: "varchar", length: 20, nullable: true })
    whatsapp?: string;

    @ManyToMany(() => Student, (student) => student.parents)
    students?: Student[];

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

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt?: Date;

    @Column({ type: "text", nullable: true })
    notes?: string;

}