import { UserSeeder } from './UserSeeder';
import { Seeder, runSeeder, SeederFactoryManager } from 'typeorm-extension';
import {DataSource} from "typeorm"

export class MainSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
        await runSeeder(dataSource, UserSeeder)
        
    }
}