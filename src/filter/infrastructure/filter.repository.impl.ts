import { Injectable } from '@nestjs/common';
import { FilterEntity } from '../domains/entities/filter.entity';
import { IFilterRepository } from '../domains/repository/filter.repository.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

type FilterType = Prisma.FilterGetPayload<object>;

@Injectable()
export class FilterRepository implements IFilterRepository {
  constructor(readonly prisma: PrismaService) {}

  // PrismaのモデルからEntityへの変換
  toEntity(filter: FilterType): FilterEntity {
    return FilterEntity.factory({
      userId: filter.userId,
      parameters: filter.parameters as FilterEntity['parameters'],
      createdAt: filter.createdAt,
      updatedAt: filter.updatedAt,
    });
  }

  // ユーザーIDに基づくフィルター取得
  async findByUserId(userId: string): Promise<FilterEntity | null> {
    const filter = await this.prisma.filter.findUnique({
      where: { userId },
    });
    return filter ? this.toEntity(filter) : null;
  }

  // 新規フィルター作成
  async create(filter: FilterEntity): Promise<FilterEntity> {
    const created = await this.prisma.filter.create({
      data: {
        userId: filter.userId,
        parameters: filter.parameters,
      },
    });
    return this.toEntity(created);
  }

  // フィルター更新
  async update(
    userId: string,
    parameters: FilterEntity['parameters'],
  ): Promise<FilterEntity> {
    const updated = await this.prisma.filter.update({
      where: { userId },
      data: { parameters },
    });
    return this.toEntity(updated);
  }
}
