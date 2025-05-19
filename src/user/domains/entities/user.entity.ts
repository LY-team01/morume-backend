import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nickname: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  avatarUrl: string | null;

  @Column({ type: 'json', nullable: true })
  filter: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  static create(data: {
    id: string;
    nickname: string;
    avatarUrl: string | null;
    filter: Record<string, any>;
  }): UserEntity {
    const user = new UserEntity();
    user.id = data.id;
    user.nickname = data.nickname;
    user.avatarUrl = data.avatarUrl;
    user.filter = data.filter;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return user;
  }

  static factory(data: {
    id: string;
    nickname: string;
    avatarUrl: string;
    filter: Record<string, any>;
    createdAt: Date;
    updatedAt: Date | null;
  }): UserEntity {
    const user = new UserEntity();
    user.id = data.id;
    user.nickname = data.nickname;
    user.avatarUrl = data.avatarUrl;
    user.filter = data.filter;
    user.createdAt = data.createdAt;
    user.updatedAt = data.updatedAt;
    return user;
  }
}
