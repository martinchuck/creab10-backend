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
import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
import { User } from 'src/Users/user.entity';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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
    const user: User = await this.usersRepository.findOneByEmail(email);

    if (await this.encoderService.checkPassword(password, user.password)) {
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

  async requestResetPassword(
    requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    const { email } = requestResetPasswordDto;
    const user: User = await this.usersRepository.findOneByEmail(email);
    user.resetPasswordToken = v4();
    this.usersRepository.save(user);
    // Send email (e.g. Dispatch an event so MailerModule can send an email)
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { resetPasswordToken, password } = resetPasswordDto;
    const user: User = await this.usersRepository.findOneByResetPasswordToken(
      resetPasswordToken,
    );

    user.password = await this.encoderService.encodePassword(password);
    user.resetPasswordToken = null;
    this.usersRepository.save(user);
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    user: User,
  ): Promise<void> {
    const { oldPassword, newPassword } = changePasswordDto;
    if (await this.encoderService.checkPassword(oldPassword, user.password)) {
      user.password = await this.encoderService.encodePassword(newPassword);
      this.usersRepository.save(user);
    } else {
      throw new BadRequestException('Old password does not match');
    }
  }
}
