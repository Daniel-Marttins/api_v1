import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionType, UserType } from "../types/GenericTypes";

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

    @Column({ type: "timestamp", nullable: true})
    subscriptionStartDate?: Date;

    @Column({ type: "timestamp", nullable: true})
    subscriptionEndDate?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt?: Date;

}