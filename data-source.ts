import { Category } from 'src/Categories/category.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './src/Users/user.entity';
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '0000',
  database: 'creab10',
  entities: [User, Category],
  migrations: ['dist/migrations/*.js'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
