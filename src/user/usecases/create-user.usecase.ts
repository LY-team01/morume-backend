import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/domains/repository/user.repository.interface';
import { UserEntity } from '../domains/entities/user.entity';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: {
    id: string;
    nickname: string;
    avatarUrl?: string | null;
    filter: Record<string, any>;
    features: number[] | null;
  }): Promise<UserEntity> {
    const user = UserEntity.create({
      id: dto.id,
      nickname: dto.nickname,
      avatarUrl: dto.avatarUrl || null,
      filter: dto.filter,
      features: dto.features,
    });
    return await this.userRepository.save(user);
  }
}
