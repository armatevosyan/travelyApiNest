import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { FileEntity } from './file.entity';

export enum FileRelationType {
  USER = 'user',
  PLACE = 'place',
  BLOG = 'blog',
}

@Entity('file_relations')
@Index(['entityType', 'entityId'])
@Index(['fileId'])
export class FileRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileId: number;

  @ManyToOne(() => FileEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fileId' })
  file: FileEntity;

  @Column({ type: 'varchar', length: 50 })
  entityType: FileRelationType; // 'user', 'place', 'blog', etc.

  @Column()
  entityId: number; // ID of the related entity (userId, placeId, blogId)

  @CreateDateColumn()
  createdAt: Date;
}
