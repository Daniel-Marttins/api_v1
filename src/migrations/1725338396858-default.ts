import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1725338396858 implements MigrationInterface {
    name = 'Default1725338396858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cities" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "ibgeCode" character varying(100) NOT NULL, "state" character varying(20) NOT NULL, "country" character varying(150) NOT NULL, "population" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."courses_level_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15')`);
        await queryRunner.query(`CREATE TYPE "public"."courses_model_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13')`);
        await queryRunner.query(`CREATE TYPE "public"."courses_type_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6')`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "sku" integer NOT NULL, "code" character varying(255) NOT NULL, "level" "public"."courses_level_enum" NOT NULL DEFAULT '15', "model" "public"."courses_model_enum" NOT NULL DEFAULT '13', "type" "public"."courses_type_enum" NOT NULL DEFAULT '6', "name" character varying(255) NOT NULL, "description" text, "duration" integer NOT NULL, "scheduleId" character varying(255), "capacity" integer, "enrolledStudents" integer NOT NULL, "price" numeric(10,2) NOT NULL, "feeAmount" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "notes" text, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."monthlyFees_status_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "monthlyFees" ("id" SERIAL NOT NULL, "sku" integer NOT NULL, "status" "public"."monthlyFees_status_enum" NOT NULL DEFAULT '1', "referenceNumber" integer, "description" character varying(150), "dueDate" TIMESTAMP NOT NULL, "paymentDate" TIMESTAMP, "discount" numeric(10,2), "penalty" numeric(10,2), "amount" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "notes" text, "studentId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "PK_e4c316bd648eaec4020e86350b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."students_status_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7')`);
        await queryRunner.query(`CREATE TYPE "public"."students_gender_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "sku" integer NOT NULL, "firstName" character varying(150) NOT NULL, "lastName" character varying(150) NOT NULL, "status" "public"."students_status_enum" NOT NULL DEFAULT '0', "photoUrl" text, "cpf" character varying(14) NOT NULL, "rg" character varying(18) NOT NULL, "nationality" character varying(100) NOT NULL, "bloodType" character varying(10) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(20), "birthdate" TIMESTAMP NOT NULL, "gender" "public"."students_gender_enum" NOT NULL DEFAULT '2', "zipCode" character varying(150), "address" character varying(200), "addressNumber" integer, "neighborhood" character varying(150), "complement" character varying(100), "emergencyContactName" character varying(150), "emergencyContactPhone" character varying(20), "enrollmentDate" TIMESTAMP NOT NULL DEFAULT now(), "medicalConditions" text, "notes" text, "cityId" integer, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students_courses_courses" ("studentsId" integer NOT NULL, "coursesId" integer NOT NULL, CONSTRAINT "PK_f0d129776db683e3f1f867aaea9" PRIMARY KEY ("studentsId", "coursesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d08a437ae8b8753b7f2071bbb9" ON "students_courses_courses" ("studentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c9c71641a945e6c43bea92f882" ON "students_courses_courses" ("coursesId") `);
        await queryRunner.query(`ALTER TABLE "monthlyFees" ADD CONSTRAINT "FK_b13e012c3685c485e9beacb31ba" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "monthlyFees" ADD CONSTRAINT "FK_04e83c684366df392426cbad891" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_b7dbb76dc020be45610b19096b1" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_courses_courses" ADD CONSTRAINT "FK_d08a437ae8b8753b7f2071bbb9a" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "students_courses_courses" ADD CONSTRAINT "FK_c9c71641a945e6c43bea92f8825" FOREIGN KEY ("coursesId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students_courses_courses" DROP CONSTRAINT "FK_c9c71641a945e6c43bea92f8825"`);
        await queryRunner.query(`ALTER TABLE "students_courses_courses" DROP CONSTRAINT "FK_d08a437ae8b8753b7f2071bbb9a"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_b7dbb76dc020be45610b19096b1"`);
        await queryRunner.query(`ALTER TABLE "monthlyFees" DROP CONSTRAINT "FK_04e83c684366df392426cbad891"`);
        await queryRunner.query(`ALTER TABLE "monthlyFees" DROP CONSTRAINT "FK_b13e012c3685c485e9beacb31ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9c71641a945e6c43bea92f882"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d08a437ae8b8753b7f2071bbb9"`);
        await queryRunner.query(`DROP TABLE "students_courses_courses"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TYPE "public"."students_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."students_status_enum"`);
        await queryRunner.query(`DROP TABLE "monthlyFees"`);
        await queryRunner.query(`DROP TYPE "public"."monthlyFees_status_enum"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TYPE "public"."courses_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."courses_model_enum"`);
        await queryRunner.query(`DROP TYPE "public"."courses_level_enum"`);
        await queryRunner.query(`DROP TABLE "cities"`);
    }

}
