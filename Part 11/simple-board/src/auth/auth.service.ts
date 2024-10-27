import { Injectable } from '@nestjs/common';
import {UserService} from "../routes/user/user.service";
import {compare} from 'bcrypt';
import {User} from "../entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "jsonwebtoken";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.getUserByUsername(username);

        // passport 에서는 null을 리턴하면 인증 실패로 간주
        if (!user) return null;

        if (await compare(password, user.password)) {
            return user;
        } else {
            return null;
        }
    }

    async login(user: User) {

        const payload = {
            id: user.id,
            username: user.username,
            name: user.name,
        };

        console.log(payload);

        return {
            accessToken: this.jwtService.sign(payload, {expiresIn: '1d'}),
        };
    }
}
