import { Injectable } from '@nestjs/common';
import { GroupEntity } from 'src/group/domains/entities/group.entity';
import { IGroupRepository } from 'src/group/domains/repository/group.repository.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ResourceNotFoundError } from 'src/shared/errors/resource-not-found.error';

type GroupType = Prisma.GroupGetPayload<object>;

@Injectable()
export class GroupRepository implements IGroupRepository {
  constructor(readonly prisma: PrismaService) {}

  toEntity(input: { group: GroupType }): GroupEntity {
    return GroupEntity.factory({
      id: input.group.id,
      createdAt: input.group.createdAt,
      updatedAt: input.group.updatedAt,
    });
  }

  async findById(id: string): Promise<GroupEntity> {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: { users: true },
    });

    if (!group) {
      throw new ResourceNotFoundError();
    }

    return this.toEntity({ group });
  }

  async findByUserId(userId: string): Promise<GroupEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { group: true },
    });
    if (!user) {
      throw new ResourceNotFoundError('ユーザーが見つかりません');
    }
    if (!user?.group) {
      return null;
    }

    return this.toEntity({ group: user.group });
  }

  async save(group: GroupEntity): Promise<GroupEntity> {
    const now = new Date();

    const existingGroup = await this.prisma.group.findUnique({
      where: { id: group.id },
    });

    const groupData = {
      id: group.id,
      createdAt: existingGroup?.createdAt ?? group.createdAt ?? now,
      updatedAt: now,
    };

    const savedGroup = await this.prisma.group.upsert({
      where: { id: group.id },
      update: { ...groupData, createdAt: undefined }, // createdAt は update で上書きしない
      create: groupData,
    });

    return this.toEntity({ group: savedGroup });
  }

  async updateUserGroup(userId: string, groupId: string | null): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { groupId },
    });
  }

  async findUserIdsByGroupId(groupId: string): Promise<string[]> {
    const users = await this.prisma.user.findMany({
      where: { groupId },
      select: { id: true },
    });
    return users.map((user) => user.id);
  }
}
