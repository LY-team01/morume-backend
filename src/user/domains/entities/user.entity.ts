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

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  static create(data: {
    id: string;
    nickname: string;
    avatarUrl: string | null;
  }): UserEntity {
    const user = new UserEntity();
    user.id = data.id;
    user.nickname = data.nickname;
    user.avatarUrl = data.avatarUrl;
    user.createdAt = new Date();
    user.updatedAt = null;
    return user;
  }

  static factory(data: {
    id: string;
    nickname: string;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date | null;
  }): UserEntity {
    const user = new UserEntity();
    user.id = data.id;
    user.nickname = data.nickname;
    user.avatarUrl = data.avatarUrl;
    user.createdAt = data.createdAt;
    user.updatedAt = data.updatedAt;
    return user;
  }
}
