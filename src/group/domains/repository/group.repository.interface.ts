import { GroupEntity } from '../entities/group.entity';

export interface IGroupRepository {
  findById(id: string): Promise<GroupEntity | null>;
  findByUserId(userId: string): Promise<GroupEntity | null>;
  save(group: GroupEntity): Promise<GroupEntity>;
  updateUserGroup(userId: string, groupId: string | null): Promise<void>;
  findUserIdsByGroupId(groupId: string): Promise<string[]>;
}
