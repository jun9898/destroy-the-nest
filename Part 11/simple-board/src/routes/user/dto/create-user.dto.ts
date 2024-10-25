import {IsEmail, IsIn, IsNotEmpty, IsPhoneNumber, MinLength} from "class-validator";

export class CreateUserDto {

    @MinLength(1)
    @IsNotEmpty()
    username: string;

    @MinLength(1)
    @IsNotEmpty()
    password: string;

    @MinLength(1)
    @IsNotEmpty()
    name: string;

}