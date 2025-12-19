import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { FileEntity } from '@/modules/files/entities/file.entity';

export enum LocationType {
  COUNTRY = 'country',
  STATE = 'state',
  CITY = 'city',
}

@Entity('locations')
@Index(['type'])
@Index(['parentId'])
@Index(['type', 'parentId'])
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: LocationType,
  })
  type: LocationType;

  @Column({ type: 'int', nullable: true })
  parentId: number | null;

  @ManyToOne(() => Location, (location) => location.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent: Location | null;

  @OneToMany(() => Location, (location) => location.parent)
  children: Location[];

  @Column({ type: 'int', nullable: true })
  imageId: number | null;

  @ManyToOne(() => FileEntity, { nullable: true })
  @JoinColumn({ name: 'imageId' })
  image: FileEntity | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
