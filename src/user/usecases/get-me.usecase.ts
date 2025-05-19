import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/user/domains/repository/user.repository.interface';
import { UserEntity } from '../domains/entities/user.entity';
import { ResourceNotFoundError } from 'src/shared/errors/resource-not-found.error';

@Injectable()
export class GetMeUserUsecase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: { userId: string }): Promise<UserEntity> {
    try {
      const user = await this.userRepository.getByUserId(input.userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${input.userId} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw new NotFoundException(`User with ID ${input.userId} not found`);
      }
    }
  }
}
