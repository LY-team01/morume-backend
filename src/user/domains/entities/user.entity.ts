import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nickname: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  avatarUrl: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  static create(data: {
    nickname: string;
    avatarUrl: string | undefined;
  }): User {
    const user = new User();
    user.id = '';
    user.nickname = data.nickname;
    user.avatarUrl = data.avatarUrl || '';
    user.createdAt = new Date();
    user.updatedAt = null;
    return user;
  }

  static factory(data: {
    id: string;
    nickname: string;
    avatarUrl: string | undefined;
    createdAt: Date;
    updatedAt: Date | null;
  }): User {
    const user = new User();
    user.id = data.id;
    user.nickname = data.nickname;
    user.avatarUrl = data.avatarUrl || '';
    user.createdAt = data.createdAt;
    user.updatedAt = data.updatedAt;
    return user;
  }
}
