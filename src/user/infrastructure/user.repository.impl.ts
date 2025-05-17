import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/domains/entities/user.entity';
import { IUserRepository } from 'src/user/domains/repository/user.repository.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

type UserType = Prisma.UserGetPayload<object>;
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(readonly prisma: PrismaService) {}
  toEntity(user: UserType): UserEntity {
    return UserEntity.factory({
      id: user.id,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async getAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.toEntity(user));
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const userData: Prisma.UserCreateInput = {
      id: user.id,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    const savedUser = await this.prisma.user.create({
      data: userData,
    });
    return this.toEntity(savedUser);
  }
}
