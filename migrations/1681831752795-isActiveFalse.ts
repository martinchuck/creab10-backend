import { MigrationInterface, QueryRunner } from "typeorm";

export class IsActiveFalse1681831752795 implements MigrationInterface {
    name = 'IsActiveFalse1681831752795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT '1'`);
    }

}
