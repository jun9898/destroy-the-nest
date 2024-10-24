import {Get, Injectable} from '@nestjs/common';

@Injectable()
export class BoardService {
    private boards = [
        {
            name: "name1",
            contents: "contents1",
            id: 1
        },
        {
            name: "name2",
            contents: "contents2",
            id: 2
        },
        {
            name: "name3",
            contents: "contents3",
            id: 3
        },
        {
            name: "name4",
            contents: "contents4",
            id: 4
        }
    ]

    findAll() {
        this.getNextId()
        return this.boards;
    }

    findOne(id: number) {
        return this.boards.find(board => board.id === id);
    }

    create(board: any) {
        const newBoard = { id: this.getNextId(), ...board}
        this.boards.push(newBoard);
        return newBoard
    }

    update(id: number, board: any) {
        const index = this.getBoardId(id);
        if (index > -1) {
            this.boards[index] = {...this.boards[index], ...board}
            return this.boards[index];
        }
    }

    delete(id: number) {
        const index = this.getBoardId(id);
        if (index > -1) {
            const deletedBoard = this.boards[index];
            this.boards.splice(index, 1);
            return deletedBoard;
        }
    }

    getNextId() {
        return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
    }

    getBoardId(id: number) {
        return this.boards.findIndex(board => board.id === id);
    }

}
