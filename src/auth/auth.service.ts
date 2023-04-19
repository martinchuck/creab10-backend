import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { v4 } from 'uuid';
import { ActivateUserDto } from './dto/activate-user.dto';
import { UnprocessableEntityException } from '@nestjs/common/exceptions';
import { User } from 'src/Users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private encoderService: EncoderService,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
    const { firstName, lastName, email, password } = registerUserDto;
    const hashedPassword = await this.encoderService.encodePassword(password);
    return this.usersRepository.createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
      v4(),
    );
  }
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOneByEmail(email);

    if (
      user &&
      (await this.encoderService.checkPassword(password, user.password))
    ) {
      const payload: JwtPayload = {
        id: user.id,
        email,
        isActive: user.isActive,
      };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async activateUser(activateUserDto: ActivateUserDto): Promise<void> {
    const { id, code } = activateUserDto;
    const user: User =
      await this.usersRepository.findOneInactiveByIdAndActivationToken(
        id,
        code,
      );

    if (!user) {
      throw new UnprocessableEntityException('This action can not be done');
    }

    this.usersRepository.activateUser(user);
  }
}
