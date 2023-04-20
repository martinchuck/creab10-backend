import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ type: 'uuid', name: 'activation_token' })
  activationToken: string;

  @Column({ type: 'uuid', name: 'reset_password_token', nullable: true })
  resetPasswordToken: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_on' })
  createdOn: Date;
}
