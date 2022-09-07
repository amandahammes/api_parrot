import { MigrationInterface, QueryRunner } from "typeorm";

export class default1662476272799 implements MigrationInterface {
    name = 'default1662476272799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`idPost\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`user_idUser\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`idUser\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`img\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(70) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_41cd02b764a560d413b6415e41f\` FOREIGN KEY (\`user_idUser\`) REFERENCES \`user\`(\`idUser\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_41cd02b764a560d413b6415e41f\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`img\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`idUser\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`user_idUser\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`idPost\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
