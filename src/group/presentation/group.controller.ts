// src/group/presentation/group.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  Param,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/shared/fireabase-auth.guard';
import { CreateGroupUseCase } from '../usecases/create-group.usecase';
import { JoinUserUseCase } from '../usecases/join-user.usecase';
import { GetGroupByUserIdUseCase } from '../usecases/get-group-by-user-id.usecase';
import { Request, Response } from 'express';
import { CreateGroupResponse } from './response/create-group.response';

@Controller('groups')
export class GroupController {
  constructor(
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly inviteUserUseCase: JoinUserUseCase,
    private readonly getGroupByUserIdUseCase: GetGroupByUserIdUseCase,
  ) {}

  @Put()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('firebase-token')
  @ApiOperation({ summary: 'グループ作成' })
  @ApiResponse({
    status: 201,
    description: 'グループ作成成功',
    type: CreateGroupResponse,
  })
  async createGroup(@Req() req: Request) {
    const userId = req.user.uid;
    return await this.createGroupUseCase.execute(userId);
  }

  @Get('invite/:id')
  @ApiOperation({ summary: 'ユニバーサルリンクを開いた時' })
  invite(@Param('id') id: string, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
    <html>
      <head><title>グループ招待</title></head>
      <body>
        <p>アプリが自動で開かない場合は、以下をタップしてください：</p>
        <a href="morume://api/groups/invite/${id}">アプリで開く</a>
      </body>
    </html>
  `);
  }

  @Post('join/:groupId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('firebase-token')
  @ApiOperation({ summary: 'グループ参加' })
  @ApiResponse({
    status: 200,
    description: 'グループ参加成功',
  })
  @ApiResponse({
    status: 404,
    description: 'グループが見つかりません',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Group with ID {groupId} not found',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async inviteUser(@Req() req: Request, @Param('groupId') groupId: string) {
    const userId = req.user.uid;
    await this.inviteUserUseCase.execute({ userId, groupId });
    return { status: 'success' };
  }

  @Get(':userId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('firebase-token')
  @ApiOperation({ summary: 'グループ取得' })
  @ApiResponse({
    status: 200,
    description: 'グループ取得成功',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        userIds: { type: 'array', items: { type: 'string' } },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'グループが見つかりません',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Group not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async getGroup(@Param('userId') userId: string) {
    return await this.getGroupByUserIdUseCase.execute(userId);
  }
}
