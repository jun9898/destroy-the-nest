import {IsNotEmpty, IsOptional, MaxLength, MinLength} from "class-validator";
import {ApiProperty, OmitType, PartialType, PickType} from "@nestjs/swagger";
import {CreateBoardDto} from "./create-board.dto";

export class UpdateBoardDto {
    @IsNotEmpty()
    @ApiProperty({
        required: false,
        description: '게시글 내용',
        example: '게시글 내용'
    })
    contents?: string;
}

// 모든 필드를 선택적으로
// export class UpdateBoardDto extends PartialType(CreateBoardDto) {};

// name 필드만 선택하여 UpdateBoardDto에 포함
// export class UpdateBoardDto extends PickType(CreateBoardDto, ["name"]) {};

// name 필드만 제외하여 UpdateBoardDto에 포함
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ["name"]) {};
