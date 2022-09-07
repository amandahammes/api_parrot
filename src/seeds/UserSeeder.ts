import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import { User } from '../entity/User';
import bcrypt from "bcrypt"

export class UserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
        const userRepository = dataSource.getRepository(User)
        
        const userData = {
            name: 'admin',
            email:'admin@admin.com',
            apartment: '01',
            password: await bcrypt.hash('admin', 10),
            role: 'ADMIN'
        }

        const userExists = await userRepository.findOneBy({email: userData.email})

        if(!userExists){
            const newUser = userRepository.create(userData)
            await userRepository.save(newUser)
        }

    }
}
