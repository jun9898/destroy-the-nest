import {Seeder, SeederFactoryManager} from 'typeorm-extension';
import {DataSource} from "typeorm";

export default class UserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const userRepository = dataSource.getRepository('User');
        await userRepository.insert([
            {
                username: 'johndoe',
                name: 'John Doe',
                password: 'password'
            },
        ]);
    }
}