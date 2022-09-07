import { MigrationInterface, QueryRunner } from "typeorm";

export class default1662589385324 implements MigrationInterface {
    name = 'default1662589385324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post\` (\`idPost\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(300) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_idUser\` int NULL, PRIMARY KEY (\`idPost\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_41cd02b764a560d413b6415e41f\` FOREIGN KEY (\`user_idUser\`) REFERENCES \`user\`(\`idUser\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_41cd02b764a560d413b6415e41f\``);
        await queryRunner.query(`DROP TABLE \`post\``);
    }

}
