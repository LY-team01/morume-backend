import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IGroupRepository } from 'src/group/domains/repository/group.repository.interface';
import { IUserRepository } from 'src/user/domains/repository/user.repository.interface';
@Injectable()
export class GetGroupByUserIdUseCase {
  constructor(
    @Inject('GroupRepository')
    private readonly groupRepository: IGroupRepository,
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<{
    id: string;
    userIds: string[];
    createdAt: Date;
  } | null> {
    try {
      const group = await this.groupRepository.findByUserId(userId);
      if (!group) {
        throw new NotFoundException('グループに所属していません');
      }
      // グループに所属するユーザーを取得
      const userIds = await this.userRepository.findUserIdsByGroupId(group.id);

      return {
        id: group.id,
        userIds,
        createdAt: group.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
