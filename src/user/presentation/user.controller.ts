import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponse } from 'src/user/presentation/response/user.response';
import { GetAllUserUsecase } from '../usecases/get-all-user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly userUsecase: GetAllUserUsecase) {}

  @Get()
  @ApiOperation({ summary: 'ユーザ一覧の取得' })
  @ApiResponse({
    status: 200,
    description: 'ユーザー一覧取得成功',
    type: [UserResponse],
  })
  async getAllUsers() {
    return await this.userUsecase.execute();
  }
}
