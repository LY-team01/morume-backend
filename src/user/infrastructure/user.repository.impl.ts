import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/domains/entities/user.entity';
import { IUserRepository } from 'src/user/domains/repository/user.repository.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ResourceNotFoundError } from 'src/shared/errors/resource-not-found.error';

type UserType = Prisma.UserGetPayload<object>;
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(readonly prisma: PrismaService) {}
  toEntity(input: { user: UserType; filter: Record<string, any> }): UserEntity {
    return UserEntity.factory({
      id: input.user.id,
      nickname: input.user.nickname,
      avatarUrl: input.user.avatarUrl,
      filter: input.filter,
      createdAt: input.user.createdAt,
      updatedAt: input.user.updatedAt,
    });
  }

  async getAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      include: {
        filter: true,
      },
    });
    return users.map((user) =>
      this.toEntity({
        user,
        filter: user.filter.parameters as Record<string, any>,
      }),
    );
  }

  async getByUserId(userId: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { filter: true },
    });

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return this.toEntity({
      user,
      filter: user.filter.parameters as Record<string, any>,
    });
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const now = new Date();

    const existingUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    const userData = {
      id: user.id,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
      createdAt: existingUser?.createdAt ?? user.createdAt ?? now,
      updatedAt: now,
    };

    const filterData = {
      userId: user.id,
      parameters: user.filter,
      createdAt: user?.createdAt ?? user.createdAt ?? now,
      updatedAt: now,
    };

    const [savedUser, savedFilter] = await this.prisma.$transaction([
      this.prisma.user.upsert({
        where: { id: user.id },
        update: { ...userData, createdAt: undefined }, // createdAt は update で上書きしない
        create: userData,
      }),
      this.prisma.filter.upsert({
        where: { userId: user.id },
        update: { ...filterData, createdAt: undefined },
        create: filterData,
      }),
    ]);

    return this.toEntity({
      user: savedUser,
      filter: savedFilter.parameters as Record<string, any>,
    });
  }
}
