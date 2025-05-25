import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IGroupRepository } from 'src/group/domains/repository/group.repository.interface';
@Injectable()
export class InviteUserUseCase {
  constructor(
    @Inject('GroupRepository')
    private readonly groupRepository: IGroupRepository,
  ) {}

  async execute(dto: { userId: string; groupId: string }): Promise<void> {
    // 1. グループの存在確認
    try {
      await this.groupRepository.findById(dto.groupId);
    } catch {
      throw new NotFoundException('グループが見つかりません');
    }

    // 2. 既存のグループから脱退
    await this.groupRepository.updateUserGroup(dto.userId, null);

    // 3. 新しいグループに参加
    await this.groupRepository.updateUserGroup(dto.userId, dto.groupId);
  }
}
