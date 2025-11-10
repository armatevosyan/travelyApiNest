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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
