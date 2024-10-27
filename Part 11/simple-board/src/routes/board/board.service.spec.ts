import {Test, TestingModule} from '@nestjs/testing';
import {BoardService} from './board.service';
import {Repository} from "typeorm";
import {Board} from "../../entities/board.entity";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>;
  const boardRepositoryToken = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: boardRepositoryToken,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
          },
          useClass: Repository,
        }
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
  });

  it('boardService should be defined', () => {
    expect(boardService).toBeDefined();
  });

  it('boardRepository should be defined', () => {
    expect(boardRepository).toBeDefined();
  });

  describe('게시글 조회', () => {

    it('2번 게시글의 작성자는 22다', async () => {
      jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
        id: 1,
        userId: 2,
        contents: '게시글',
        createdAt: new Date(),
        updateAt: new Date(), // updateAt으로 수정
        user: {
          id: 2,
          username: '22',
          name: '22',
        },
      } as Board);

      const board = await boardService.getBoardById(2);


      expect(board.user.name).toBe('22');
    });
  })
});
