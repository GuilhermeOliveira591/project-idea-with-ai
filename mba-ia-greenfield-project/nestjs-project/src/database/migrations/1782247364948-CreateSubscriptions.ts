import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubscriptions1782247364948 implements MigrationInterface {
  name = 'CreateSubscriptions1782247364948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "channel_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f94727d15ad613cd0e651ce299" ON "subscriptions" ("channel_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0a95ef8a28188364c546eb65c" ON "subscriptions" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f517dfb9e95674ffed33138db5" ON "subscriptions" ("user_id", "channel_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_f94727d15ad613cd0e651ce299c" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_f94727d15ad613cd0e651ce299c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f517dfb9e95674ffed33138db5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d0a95ef8a28188364c546eb65c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f94727d15ad613cd0e651ce299"`,
    );
    await queryRunner.query(`DROP TABLE "subscriptions"`);
  }
}
