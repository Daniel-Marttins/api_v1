import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1725406712871 implements MigrationInterface {
    name = 'Default1725406712871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tenants_type_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TYPE "public"."tenants_subscriptionstatus_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "tenants" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "type" "public"."tenants_type_enum" NOT NULL DEFAULT '3', "subscriptionStatus" "public"."tenants_subscriptionstatus_enum" DEFAULT '0', "subscriptionStartDate" TIMESTAMP, "subscriptionEndDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."institutions_institutiontype_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10')`);
        await queryRunner.query(`CREATE TABLE "institutions" ("id" SERIAL NOT NULL, "sku" integer NOT NULL, "name" character varying(150) NOT NULL, "institutionType" "public"."institutions_institutiontype_enum" NOT NULL DEFAULT '10', "logoUrl" text NOT NULL, "cnpj" character varying(18), "email" character varying(150), "phone" character varying(20), "accreditationNumber" character varying(50) NOT NULL, "foundationDate" TIMESTAMP NOT NULL DEFAULT now(), "principalName" character varying(150) NOT NULL, "principalEmail" character varying(150), "missionStatement" text, "vision" text, "values" text, "facilitiesDescription" text, "zipCode" character varying(150), "address" character varying(200), "addressNumber" integer, "neighborhood" character varying(150), "complement" character varying(100), "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "tenantId" integer, "cityId" integer, CONSTRAINT "PK_0be7539dcdba335470dc05e9690" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."parents_relationships_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12')`);
        await queryRunner.query(`CREATE TYPE "public"."parents_preferredcontactmethod_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7')`);
        await queryRunner.query(`CREATE TABLE "parents" ("id" SERIAL NOT NULL, "sku" integer NOT NULL, "firstName" character varying(150) NOT NULL, "lastName" character varying(150) NOT NULL, "cpf" character varying(14) NOT NULL, "relationships" "public"."parents_relationships_enum" NOT NULL DEFAULT '12', "preferredContactMethod" "public"."parents_preferredcontactmethod_enum" NOT NULL DEFAULT '7', "emergencyContact" boolean NOT NULL DEFAULT true, "email" character varying(150), "phone" character varying(20), "whatsapp" character varying(20), "zipCode" character varying(150), "address" character varying(200), "addressNumber" integer, "neighborhood" character varying(150), "complement" character varying(100), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "notes" text, "tenantId" integer, "cityId" integer, CONSTRAINT "PK_9a4dc67c7b8e6a9cb918938d353" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_type_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "sku" integer NOT NULL, "type" "public"."users_type_enum" NOT NULL DEFAULT '3', "name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "tenantId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students_parents_parents" ("studentsId" integer NOT NULL, "parentsId" integer NOT NULL, CONSTRAINT "PK_8f6e7204d170c426985a3e1f224" PRIMARY KEY ("studentsId", "parentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d866deee9f1ea4ed869d8b58c3" ON "students_parents_parents" ("studentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7eafce626c0843047700e84ed0" ON "students_parents_parents" ("parentsId") `);
        await queryRunner.query(`ALTER TABLE "courses" ADD "tenantId" integer`);
        await queryRunner.query(`ALTER TABLE "monthlyFees" ADD "tenantId" integer`);
        await queryRunner.query(`ALTER TABLE "students" ADD "tenantId" integer`);
        await queryRunner.query(`ALTER TABLE "institutions" ADD CONSTRAINT "FK_1d875ed6b46732c4d556c60a9a8" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "institutions" ADD CONSTRAINT "FK_8ceec11935de68134f8129426f7" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_61c9baadf12783792db01613201" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "monthlyFees" ADD CONSTRAINT "FK_e2837ce001e3ddbf9e2bf064307" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_0fe5a6912f421e1c20615814426" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parents" ADD CONSTRAINT "FK_a68c92787e16626ccb578413573" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parents" ADD CONSTRAINT "FK_8a55fe8c5927c3d2cce60fe8551" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c58f7e88c286e5e3478960a998b" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_parents_parents" ADD CONSTRAINT "FK_d866deee9f1ea4ed869d8b58c34" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "students_parents_parents" ADD CONSTRAINT "FK_7eafce626c0843047700e84ed05" FOREIGN KEY ("parentsId") REFERENCES "parents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students_parents_parents" DROP CONSTRAINT "FK_7eafce626c0843047700e84ed05"`);
        await queryRunner.query(`ALTER TABLE "students_parents_parents" DROP CONSTRAINT "FK_d866deee9f1ea4ed869d8b58c34"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c58f7e88c286e5e3478960a998b"`);
        await queryRunner.query(`ALTER TABLE "parents" DROP CONSTRAINT "FK_8a55fe8c5927c3d2cce60fe8551"`);
        await queryRunner.query(`ALTER TABLE "parents" DROP CONSTRAINT "FK_a68c92787e16626ccb578413573"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_0fe5a6912f421e1c20615814426"`);
        await queryRunner.query(`ALTER TABLE "monthlyFees" DROP CONSTRAINT "FK_e2837ce001e3ddbf9e2bf064307"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_61c9baadf12783792db01613201"`);
        await queryRunner.query(`ALTER TABLE "institutions" DROP CONSTRAINT "FK_8ceec11935de68134f8129426f7"`);
        await queryRunner.query(`ALTER TABLE "institutions" DROP CONSTRAINT "FK_1d875ed6b46732c4d556c60a9a8"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "tenantId"`);
        await queryRunner.query(`ALTER TABLE "monthlyFees" DROP COLUMN "tenantId"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "tenantId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7eafce626c0843047700e84ed0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d866deee9f1ea4ed869d8b58c3"`);
        await queryRunner.query(`DROP TABLE "students_parents_parents"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
        await queryRunner.query(`DROP TABLE "parents"`);
        await queryRunner.query(`DROP TYPE "public"."parents_preferredcontactmethod_enum"`);
        await queryRunner.query(`DROP TYPE "public"."parents_relationships_enum"`);
        await queryRunner.query(`DROP TABLE "institutions"`);
        await queryRunner.query(`DROP TYPE "public"."institutions_institutiontype_enum"`);
        await queryRunner.query(`DROP TABLE "tenants"`);
        await queryRunner.query(`DROP TYPE "public"."tenants_subscriptionstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tenants_type_enum"`);
    }

}
