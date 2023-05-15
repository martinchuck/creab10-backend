import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActivationToken1682027486404 implements MigrationInterface {
    name = 'AddActivationToken1682027486404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`activation_token\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      
    }

}
