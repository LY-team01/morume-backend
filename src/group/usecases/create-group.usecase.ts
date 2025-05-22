import { Injectable, NotFoundException } from "@nestjs/common";
import { IGroupRepository } from "../domains/repository/group.repository.interface";
import { GroupResponse } from "../presentation/response/group.response";
import { GroupEntity } from "../domains/entities/group.entity";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateGroupUseCase {
  constructor(
    private readonly groupRepository: IGroupRepository,
  ) {}

  async execute(userId: string): Promise<GroupResponse> {
    // 1. 既存のグループから脱退
    await this.groupRepository.updateUserGroup(userId, null);

    // 3. 新しいグループを作成
    const group = GroupEntity.create({
      id: uuidv4(),
    });
    const savedGroup = await this.groupRepository.save(group);

    // 4. ユーザーをグループに紐付け
    await this.groupRepository.updateUserGroup(userId, savedGroup.id);

    return {
      id: savedGroup.id,
      userIds: [userId],
      createdAt: savedGroup.createdAt,
    };
  }
}