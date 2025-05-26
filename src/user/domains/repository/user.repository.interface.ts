import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  getAll(): Promise<UserEntity[]>;
  getByUserId(userId: string): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
  updateUserGroup(userId: string, groupId: string): Promise<void>;
  findUserIdsByGroupId(groupId: string): Promise<string[]>;
}
