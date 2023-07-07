import { DataSource, DataSourceOptions } from 'typeorm';
import { Category } from './src/Categories/category.entity';
import { User } from './src/Users/user.entity';
import { Curso } from './src/cursos/curso.entity';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'creab10',
  entities: [User, Category, Curso],
  migrations: ['dist/migrations/*.js'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
