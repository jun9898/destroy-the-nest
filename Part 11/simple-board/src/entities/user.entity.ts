import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Board} from "./board.entity";

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn({name: 'user_id'})
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @OneToMany(() => Board, board => board.user)
    boards: Board[];

    @Column({select: false, nullable: true, insert: false, update: false})
    boardCount?: number;
}
