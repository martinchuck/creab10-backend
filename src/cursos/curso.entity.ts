import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  nombre: string;

  @Column({ length: 258 })
  descripcion: string;

  @Column({ length: 25 })
  estado: string;
}
