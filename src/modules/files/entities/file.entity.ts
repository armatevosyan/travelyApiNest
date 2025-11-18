import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '@/modules/users/user.entity';
import { FileRelation } from './file-relation.entity';

@Entity('files')
@Index(['bucketPath'])
@Index(['userId'])
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fileName: string;

  @Column({ type: 'varchar', length: 100 })
  mimeType: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column({ type: 'varchar', length: 500 })
  bucketPath: string;

  @Column({ type: 'varchar', length: 1000 })
  url: string;

  // User relation (who uploaded the file)
  @Column({ nullable: true })
  userId: number | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User | null;

  // Polymorphic relations through file_relations table
  @OneToMany(() => FileRelation, (relation) => relation.file)
  relations: FileRelation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
