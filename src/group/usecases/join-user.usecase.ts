import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IGroupRepository } from 'src/group/domains/repository/group.repository.interface';
import { IUserRepository } from 'src/user/domains/repository/user.repository.interface';
@Injectable()
export class JoinUserUseCase {
  constructor(
    @Inject('GroupRepository')
    private readonly groupRepository: IGroupRepository,
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: { userId: string; groupId: string }): Promise<void> {
    // 1. グループの存在確認
    try {
      await this.groupRepository.findById(dto.groupId);
    } catch {
      throw new NotFoundException('グループが見つかりません');
    }

    // 2. 新しいグループに参加
    await this.userRepository.updateUserGroup(dto.userId, dto.groupId);
  }
}
