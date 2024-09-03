import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cities")
export class City {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 150, nullable: false })
    name!: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    ibgeCode!: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    state!: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    country!: string;

    @Column({ type: "int", nullable: true })
    population?: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: true })
    updatedAt?: Date;

}