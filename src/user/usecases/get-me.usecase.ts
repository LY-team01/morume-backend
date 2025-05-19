import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/domains/repository/user.repository.interface';
import { UserEntity } from '../domains/entities/user.entity';

@Injectable()
export class GetMeUserUsecase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: { userId: string }): Promise<UserEntity> {
    return await this.userRepository.getByUserId(input.userId);
  }
}
