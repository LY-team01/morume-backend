import { Inject, Injectable } from '@nestjs/common';
import { IGroupRepository } from '../domains/repository/group.repository.interface';
import { IUserRepository } from 'src/user/domains/repository/user.repository.interface';
import { GroupEntity } from '../domains/entities/group.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateGroupResponse } from '../presentation/response/create-group.response';

@Injectable()
export class CreateGroupUseCase {
  constructor(
    @Inject('GroupRepository')
    private readonly groupRepository: IGroupRepository,
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<CreateGroupResponse> {
    // 1. 新しいグループを作成
    const group = GroupEntity.create({
      id: uuidv4(),
    });
    const savedGroup = await this.groupRepository.save(group);

    // 2. ユーザーの所属グループを上書き
    await this.userRepository.updateUserGroup(userId, savedGroup.id);

    const baseUrl = process.env.BASE_URL ?? '';
    const inviteUrl = `${baseUrl}/api/groups/invite/${savedGroup.id}`;

    return {
      groupId: savedGroup.id,
      inviteUrl,
    };
  }
}
