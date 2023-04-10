import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/:name')
  getCategory(@Param() params: { name: string }): Promise<Category | null> {
    return this.categoryService.findOne(params.name);
  }

  @Post()
  createCategory(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Put('/:name')
  updateCategory(
    @Param() params: { name: string },
    @Body() category: Category,
  ): Promise<Category> {
    return this.categoryService.update(params.name, category);
  }

  @Delete('/:name')
  deleteCategory(@Param() params: { name: string }): Promise<void> {
    return this.categoryService.remove(params.name);
  }
}
