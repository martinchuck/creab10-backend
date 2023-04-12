import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 25 })
  firstName: string;

  @Column({ length: 25 })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  password: string;

}
