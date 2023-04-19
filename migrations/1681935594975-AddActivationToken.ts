import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActivationToken1681935594975 implements MigrationInterface {
    name = 'AddActivationToken1681935594975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`activation_token\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_1f2c31911e3b5b4681fbc04971\` (\`activation_token\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_1f2c31911e3b5b4681fbc04971\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`activation_token\``);
    }

}
