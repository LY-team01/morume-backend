import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/user/domains/repository/user.repository.interface';
@Injectable()
export class GetGroupByUserIdUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<{
    id: string;
    userIds: string[];
    createdAt: Date;
  } | null> {
    try {
      const group = await this.userRepository.findGroupByUserId(userId);
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
