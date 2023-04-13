import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private encoderService: EncoderService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
    const { firstName, lastName, email, password } = registerUserDto;
    const hashedPassword = await this.encoderService.encodePassword(password);
    return this.usersRepository.createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
    );
  }
  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOneByEmail(email);

    if (
      user &&
      (await this.encoderService.checkPassword(password, user.password))
    ) {
      return 'jwt';
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
