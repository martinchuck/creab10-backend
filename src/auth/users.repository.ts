import { Repository } from 'typeorm';
import { User } from 'src/Users/user.entity';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    activationToken: string,
  ): Promise<void> {
    const user = this.create({
      firstName,
      lastName,
      email,
      password,
      activationToken,
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

  async findOneByEmail(email: string): Promise<User> {
    return await this.findOneBy({ email });
  }

  async activateUser(user: User): Promise<void> {
    user.isActive = true;
    this.save(user);
  }

  async findOneInactiveByIdAndActivationToken(
    id: number,
    code: string,
  ): Promise<User> {
    return this.findOneBy({
      id: id,
      activationToken: code,
      isActive: false,
    });
  }
}
