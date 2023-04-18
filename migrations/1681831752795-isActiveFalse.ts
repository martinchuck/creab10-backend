import { MigrationInterface, QueryRunner } from "typeorm";

export class IsActiveFalse1681831752795 implements MigrationInterface {
    name = 'IsActiveFalse1681831752795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(25) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT '1'`);
    }

}
