import { EntityRepository, Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '../Users/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(registerUserDto: RegisterUserDto): Promise<void> {
    const { firstName, email, password } = registerUserDto;
    const user = this.create({ firstName, email, password });
    await this.save(user);
  }
}
