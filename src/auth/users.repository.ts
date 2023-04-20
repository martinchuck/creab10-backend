import { Repository } from 'typeorm';
import { User } from 'src/Users/user.entity';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
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
    const user: User = await this.findOneBy({ email });

    if (!user){
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
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
