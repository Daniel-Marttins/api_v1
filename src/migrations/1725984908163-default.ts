import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1725984908163 implements MigrationInterface {
    name = 'Default1725984908163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."plans_plantype_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "plans" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" text NOT NULL, "planType" "public"."plans_plantype_enum" DEFAULT '3', "planSlug" character varying(100) NOT NULL DEFAULT 'ob_free', "price" numeric(10,2), "promotionPrice" numeric(10,2), "duration" integer NOT NULL, "maxStudents" integer NOT NULL, "maxInstitutions" integer NOT NULL, "maxCourses" integer NOT NULL, "maxTeacher" integer NOT NULL, "maxUsers" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_3720521a81c7c24fe9b7202ba61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grades" ("id" SERIAL NOT NULL, "period" integer NOT NULL, "periodTitle" character varying(150) NOT NULL, "grade" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "studentId" integer, "subjectId" integer, CONSTRAINT "PK_4740fb6f5df2505a48649f1687b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "image" text, "description" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_institutions_institutions" ("usersId" integer NOT NULL, "institutionsId" integer NOT NULL, CONSTRAINT "PK_229ca7dd9a7f35d492b14b8e915" PRIMARY KEY ("usersId", "institutionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bb13dddd9558aa30baf600d030" ON "users_institutions_institutions" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f76662a66ea8398107169618d" ON "users_institutions_institutions" ("institutionsId") `);
        await queryRunner.query(`CREATE TABLE "subjects_students_students" ("subjectsId" integer NOT NULL, "studentsId" integer NOT NULL, CONSTRAINT "PK_dfc83d7e87b6f29a21d530bc5a2" PRIMARY KEY ("subjectsId", "studentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_415a19ba92a50b33a3cecb76be" ON "subjects_students_students" ("subjectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d36ae861c4d45d9ba98b42efac" ON "subjects_students_students" ("studentsId") `);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "scheduleId"`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "photoUrl" text`);
        await queryRunner.query(`CREATE TYPE "public"."tenants_subscriptiontype_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "subscriptionType" "public"."tenants_subscriptiontype_enum" NOT NULL DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "subscriptionRenewal" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "subscriptionExpiration" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "currentStudents" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "currentInstitutions" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "currentCourses" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "currentTeacher" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "currentUsers" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "subscriptionPlanId" integer`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "schedule" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "institutionId" integer`);
        await queryRunner.query(`ALTER TABLE "monthlyFees" ADD "institutionId" integer`);
        await queryRunner.query(`ALTER TABLE "parents" ADD "institutionId" integer`);
        await queryRunner.query(`ALTER TABLE "students" ADD "institutionId" integer`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "FK_58436e36a8d23808b3611ba65a7" FOREIGN KEY ("subscriptionPlanId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_477dfb3469de6ce682f3339eb8f" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "monthlyFees" ADD CONSTRAINT "FK_24556bd4e5051b13274825a78b9" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parents" ADD CONSTRAINT "FK_5c5cdba701bb007cdfd7d7b1c55" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_d5ef1aaf8d648399bdcdf576dbb" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_fcfc027e4e5fb37a4372e688070" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_53072aa77cf53aec5463b9b3505" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_institutions_institutions" ADD CONSTRAINT "FK_bb13dddd9558aa30baf600d030f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_institutions_institutions" ADD CONSTRAINT "FK_9f76662a66ea8398107169618dc" FOREIGN KEY ("institutionsId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subjects_students_students" ADD CONSTRAINT "FK_415a19ba92a50b33a3cecb76bea" FOREIGN KEY ("subjectsId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subjects_students_students" ADD CONSTRAINT "FK_d36ae861c4d45d9ba98b42efaca" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects_students_students" DROP CONSTRAINT "FK_d36ae861c4d45d9ba98b42efaca"`);
        await queryRunner.query(`ALTER TABLE "subjects_students_students" DROP CONSTRAINT "FK_415a19ba92a50b33a3cecb76bea"`);
        await queryRunner.query(`ALTER TABLE "users_institutions_institutions" DROP CONSTRAINT "FK_9f76662a66ea8398107169618dc"`);
        await queryRunner.query(`ALTER TABLE "users_institutions_institutions" DROP CONSTRAINT "FK_bb13dddd9558aa30baf600d030f"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_53072aa77cf53aec5463b9b3505"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_fcfc027e4e5fb37a4372e688070"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_d5ef1aaf8d648399bdcdf576dbb"`);
        await queryRunner.query(`ALTER TABLE "parents" DROP CONSTRAINT "FK_5c5cdba701bb007cdfd7d7b1c55"`);
        await queryRunner.query(`ALTER TABLE "monthlyFees" DROP CONSTRAINT "FK_24556bd4e5051b13274825a78b9"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_477dfb3469de6ce682f3339eb8f"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_58436e36a8d23808b3611ba65a7"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "institutionId"`);
        await queryRunner.query(`ALTER TABLE "parents" DROP COLUMN "institutionId"`);
        await queryRunner.query(`ALTER TABLE "monthlyFees" DROP COLUMN "institutionId"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "institutionId"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "schedule"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "subscriptionPlanId"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "currentUsers"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "currentTeacher"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "currentCourses"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "currentInstitutions"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "currentStudents"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "subscriptionExpiration"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "subscriptionRenewal"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "subscriptionType"`);
        await queryRunner.query(`DROP TYPE "public"."tenants_subscriptiontype_enum"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "photoUrl"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "scheduleId" character varying(255)`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d36ae861c4d45d9ba98b42efac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_415a19ba92a50b33a3cecb76be"`);
        await queryRunner.query(`DROP TABLE "subjects_students_students"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f76662a66ea8398107169618d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bb13dddd9558aa30baf600d030"`);
        await queryRunner.query(`DROP TABLE "users_institutions_institutions"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
        await queryRunner.query(`DROP TABLE "grades"`);
        await queryRunner.query(`DROP TABLE "plans"`);
        await queryRunner.query(`DROP TYPE "public"."plans_plantype_enum"`);
    }

}
