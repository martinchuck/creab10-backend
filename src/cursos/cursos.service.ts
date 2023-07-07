import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './curso.entity';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private cursosRepository: Repository<Curso>,
  ) {}

  findAll(): Promise<Curso[]> {
    return this.cursosRepository.find();
  }

  findOne(id: number): Promise<Curso | null> {
    return this.cursosRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.cursosRepository.delete(id);
  }

  async create(curso: Curso): Promise<Curso> {
    return this.cursosRepository.save(curso);
  }

  async update(id: number, curso: Curso): Promise<Curso> {
    await this.cursosRepository.update(id, curso);
    return this.cursosRepository.findOneBy({ id });
  }
}
