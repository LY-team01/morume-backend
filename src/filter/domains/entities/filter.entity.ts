import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
  } from 'typeorm';
  
  
  export interface CreateFilterData {
    userId: string;  // Firebaseのuid
    parameters: Record<string, any>; //JSONとして扱う
  }
  
  export interface FilterData extends CreateFilterData {
    createdAt: Date;
    updatedAt: Date;
  }
  
  @Entity('filters')
  export class FilterEntity {
    @PrimaryColumn('uuid')
    userId: string;  // Firebaseのuidをそのまま使用
  
    @OneToOne('UserEntity', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: any;
  
    @Column({ type: 'jsonb', nullable: false })
    parameters: Record<string, any>;    //filterのパラメーターをJSONとして扱う
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    static create(data: CreateFilterData): FilterEntity {
      const filter = new FilterEntity();
      filter.userId = data.userId;  // Firebaseのuidを設定
      filter.parameters = data.parameters;
      filter.createdAt = new Date();
      filter.updatedAt = new Date();
      return filter;
    }
  
    static factory(data: FilterData): FilterEntity {
      const filter = new FilterEntity();
      filter.userId = data.userId;  // Firebaseのuidを設定
      filter.parameters = data.parameters;
      filter.createdAt = data.createdAt;
      filter.updatedAt = data.updatedAt;
      return filter;
    }
  }