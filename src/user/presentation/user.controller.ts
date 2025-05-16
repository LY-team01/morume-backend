import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponse } from 'src/user/presentation/response/user.response';
import { GetAllUserUsecase } from '../usecases/get-all-user.usecase';
import { CreateUserUsecase } from '../usecases/create-user.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly getAllUsecase: GetAllUserUsecase,
    private readonly createUsecase: CreateUserUsecase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'ユーザ一覧の取得' })
  @ApiResponse({
    status: 200,
    description: 'ユーザー一覧取得成功',
    type: [UserResponse],
  })
  async getAllUsers() {
    return await this.getAllUsecase.execute();
  }

  @Post()
  @ApiOperation({ summary: 'ユーザの作成' })
  @ApiResponse({
    status: 201,
    description: 'ユーザー作成成功',
    type: UserResponse,
  })
  async createUser() {
    const dto = {
      id: '123',
      nickname: 'testuser',
      avatarUrl: 'http://example.com/avatar.png',
    };
    return await this.createUsecase.execute(dto);
  }
}
