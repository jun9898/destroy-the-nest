import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { Board } from 'src/entities/board.entity';
import {CreateUserDto} from "./dto/create-user.dto";
import {hash, compare} from 'bcrypt';
import {LoginUserDto} from "./dto/login-user.dto";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const {username, password, name} = createUserDto;
        const encryptPassword = await hash(password, 11);
        return await this.userRepository.save({
            username,
            name,
            password: encryptPassword,
        });
    }

    async getUserByUsername(username: string) {
        return await this.userRepository.findOneBy({username});
    }

    async getUsers(id: number) {
        const qb = this.userRepository.createQueryBuilder();

        qb.addSelect((subQuery) => {
            return subQuery
                .select('count(id)')
                .from(Board, 'Board')
                .where('Board.userId = User.id');
        }, 'User_boardCount');

        return qb.getMany();
    }

}
