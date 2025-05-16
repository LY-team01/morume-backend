import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponse } from 'src/user/presentation/response/user.response';
import { GetAllUserUsecase } from '../usecases/get-all-user.usecase';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { ZodValidationPipe } from 'src/shared/zod-validation.pipe';
import { createUserValidationSchema } from './request/create-user.request';
import { z } from 'zod';
import { FirebaseAuthGuard } from 'src/shared/fireabase-auth.guard';
import { Request } from 'express';

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
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'ユーザの作成' })
  @ApiResponse({
    status: 201,
    description: 'ユーザー作成成功',
    type: UserResponse,
  })
  async createUser(
    @Body(new ZodValidationPipe(createUserValidationSchema))
    @Req()
    req: Request,
    dto: z.infer<typeof createUserValidationSchema>,
  ) {
    const user = req.user;
    return await this.createUsecase.execute({
      id: user.uid,
      nickname: dto.nickname,
      avatarUrl: dto.avatarUrl || null,
    });
  }
}
