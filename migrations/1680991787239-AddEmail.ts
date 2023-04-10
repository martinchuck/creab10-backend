import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmail1680991787239 implements MigrationInterface {
    name = 'AddEmail1680991787239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    }

}
