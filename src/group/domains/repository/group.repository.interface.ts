import { GroupEntity } from '../entities/group.entity';

export interface IGroupRepository {
  findById(id: string): Promise<GroupEntity | null>;
  save(group: GroupEntity): Promise<GroupEntity>;
}
