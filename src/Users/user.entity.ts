import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  firstName: string;

  @Column({ length: 25 })
  lastName: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ unique: true })
  email: string;

  @Column({ length: 25 })
  password: string;

}
