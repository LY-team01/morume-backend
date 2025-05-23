import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UserResponse } from 'src/user/presentation/response/user.response';
import { GetAllUserUsecase } from '../usecases/get-all-user.usecase';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { ZodValidationPipe } from 'src/shared/zod-validation.pipe';
import {
  CreateUserRequest,
  createUserValidationSchema,
} from './request/create-user.request';
import { z } from 'zod';
import { Request } from 'express';
import { FirebaseAuthGuard } from 'src/shared/fireabase-auth.guard';
import { GetMeUserUsecase } from '../usecases/get-me.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly getAllUsecase: GetAllUserUsecase,
    private readonly getMeUsecase: GetMeUserUsecase,
    private readonly createUsecase: CreateUserUsecase,
  ) {}

  @Put()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('firebase-token')
  @ApiOperation({ summary: 'ユーザの作成' })
  @ApiBody({ type: CreateUserRequest })
  @ApiResponse({
    status: 201,
    description: 'ユーザー作成成功',
    type: UserResponse,
  })
  async createUser(
    @Req()
    req: Request,
    @Body(new ZodValidationPipe(createUserValidationSchema))
    dto: z.infer<typeof createUserValidationSchema>,
  ) {
    const user = req.user;
    return await this.createUsecase.execute({
      id: user.uid,
      nickname: dto.nickname,
      avatarUrl: dto.avatarUrl || null,
      filter: dto.filter,
      features: dto.features,
    });
  }

  @Get('/list')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('firebase-token')
  @ApiOperation({ summary: 'ユーザ一覧の取得' })
  @ApiResponse({
    status: 200,
    description: 'ユーザー一覧取得成功',
    type: [UserResponse],
  })
  async getAllUsers() {
    return await this.getAllUsecase.execute();
  }

  @Get('/me')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('firebase-token')
  @ApiOperation({ summary: '自分のユーザー情報取得' })
  @ApiResponse({
    status: 200,
    description: '自分のユーザー情報取得',
    type: UserResponse,
  })
  async getMeUser(
    @Req()
    req: Request,
  ) {
    const userId = req.user.uid;
    return await this.getMeUsecase.execute({ userId });
  }
}
