import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  findOne(name: string): Promise<Category | null> {
    return this.categoriesRepository.findOneBy({ name });
  }

  async remove(name: string): Promise<void> {
    const categoria = await this.categoriesRepository.findOneBy({ name });
    await this.categoriesRepository.delete(categoria.id);
  }

  async create(category: Category): Promise<Category> {
    return this.categoriesRepository.save(category);
  }

  async update(name: string, category: Category): Promise<Category> {
    const categoria = await this.categoriesRepository.findOneBy({ name });
    await this.categoriesRepository.update(categoria.id, category);
    return this.categoriesRepository.findOneBy({ id: categoria.id });
  }
}
