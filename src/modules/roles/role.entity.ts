import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g. "admin", "user", "manager"

  @Column({ nullable: true })
  description: string;

  // One role can belong to many users
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
