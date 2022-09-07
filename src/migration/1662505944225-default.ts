import { MigrationInterface, QueryRunner } from "typeorm";

export class default1662505944225 implements MigrationInterface {
    name = 'default1662505944225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_ae05faaa55c866130abef6e1fee\``);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`userId\` \`user_idUser\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_ff1af238063a84609d1971015b5\` FOREIGN KEY (\`user_idUser\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_ff1af238063a84609d1971015b5\``);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`user_idUser\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_ae05faaa55c866130abef6e1fee\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
