import { GroupEntity } from 'src/group/domains/entities/group.entity';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  getAll(): Promise<UserEntity[]>;
  getByUserId(userId: string): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
  //グループ関連のメソッド
  findGroupByUserId(userId: string): Promise<GroupEntity | null>;
  updateUserGroup(userId: string, groupId: string): Promise<void>;
  findUserIdsByGroupId(groupId: string): Promise<string[]>;
}
