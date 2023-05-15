import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreateDateColumn1681935010633 implements MigrationInterface {
    name = 'AddCreateDateColumn1681935010633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdOn\``);
    }

}
