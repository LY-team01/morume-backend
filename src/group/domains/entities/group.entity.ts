import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('groups')
  export class GroupEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updatedAt: Date;
  
    static create(data: {
      id: string;
    }): GroupEntity {
      const group = new GroupEntity();
      group.id = data.id;
      group.createdAt = new Date();
      group.updatedAt = new Date();
      return group;
    }
  
    static factory(data: {
      id: string;
      createdAt: Date;
      updatedAt: Date | null;
    }): GroupEntity {
      const group = new GroupEntity();
      group.id = data.id;
      group.createdAt = data.createdAt;
      group.updatedAt = data.updatedAt;
      return group;
    }
  }