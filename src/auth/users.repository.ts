import { Repository } from 'typeorm';
import { User } from 'src/Users/user.entity';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(firstName, lastName, email, password): Promise<void> {

    const user = this.create({
      firstName,
      lastName,
      email,
      password,
    });

    try {
      await this.save(user);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
