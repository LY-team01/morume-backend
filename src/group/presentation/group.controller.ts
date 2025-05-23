@Controller('groups')
export class GroupController {
  constructor(
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly inviteUserUseCase: InviteUserUseCase,
    private readonly getGroupByUserIdUseCase: GetGroupByUserIdUseCase,
  ) {}

  @Put()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('firebase-token')
  @ApiOperation({ summary: 'グループ作成' })
  @ApiResponse({
    status: 201,
    description: 'グループ作成成功',
    type: GroupResponse,
  })
  async createGroup(@Req() req: Request) {
    const userId = req.user.uid;
    return await this.createGroupUseCase.execute(userId);
  }

  @Post('invite/:groupId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('firebase-token')
  @ApiOperation({ summary: 'グループ招待' })
  @ApiResponse({
    status: 200,
    description: 'グループ招待成功',
  })
  async inviteUser(
    @Req() req: Request,
    @Param('groupId') groupId: string,
  ) {
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
    type: GroupResponse,
  })
  async getGroup(@Param('userId') userId: string) {
    return await this.getGroupByUserIdUseCase.execute(userId);
  }
}