import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPassword1680991861143 implements MigrationInterface {
    name = 'AddPassword1680991861143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    }

}
