import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InstitutionType, SubscriptionType } from "../types/GenericTypes";
import { City } from "./City";
import { Tenant } from "./Tenant";
import { User } from "./User";

@Entity("institutions")
export class Institution {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "integer", nullable: false })
    sku!: number;

    @ManyToOne(() => Tenant, { eager: true, cascade: true, onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "tenantId" })
    tenant!: Tenant;

    @Column({ type: "varchar", length: 150, nullable: false })
    name!: string;

    @Column({
        type: 'enum',
        enum: InstitutionType,
        default: InstitutionType.Other
    })
    institutionType!: InstitutionType;

    @Column({ type: "text"})
    logoUrl?: string;

    @Column({ type: "varchar", length: 18, nullable: true })
    cnpj?: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    email?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    phone?: string;

    @Column({ type: "varchar", length: 50, nullable: false })
    accreditationNumber!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false})
    foundationDate!: Date;

    @Column({ type: "varchar", length: 150, nullable: false })
    principalName!: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    principalEmail?: string;

    @Column({ type: "text", nullable: true })
    missionStatement?: string;

    @Column({ type: "text", nullable: true })
    vision?: string;

    @Column({ type: "text", nullable: true })
    values?: string;

    @Column({ type: "text", nullable: true })
    facilitiesDescription?: string;

    @ManyToMany(() => User, (users) => users.institutions, { cascade: true, onDelete: "CASCADE", nullable: true })
    users?: User[];

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

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: true })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: true })
    updatedAt?: Date;

}