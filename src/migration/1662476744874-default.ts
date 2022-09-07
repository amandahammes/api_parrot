import { MigrationInterface, QueryRunner } from "typeorm";

export class default1662476744874 implements MigrationInterface {
    name = 'default1662476744874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`img\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`img\` varchar(255) NOT NULL`);
    }

}
