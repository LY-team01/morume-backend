import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  getAll(): Promise<UserEntity[]>;
}
