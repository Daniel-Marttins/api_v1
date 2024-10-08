import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionType, UserType } from "../types/GenericTypes";
import { Tenant } from "./Tenant";
import { Institution } from "./Institution";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "integer", nullable: false })
    sku!: number;

    @ManyToOne(() => Tenant, { eager: true, cascade: true, onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "tenantId" })
    tenant!: Tenant;

    @ManyToMany(() => Institution, (instituitions) => instituitions.users, { onDelete: "CASCADE", nullable: true })
    @JoinTable()
    institutions?: Institution[];

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.Guest,
        nullable: false
    })
    type!: UserType;

    @Column({ type: "varchar", length: 100, nullable: false })
    name!: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    email!: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    password!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt?: Date;

}