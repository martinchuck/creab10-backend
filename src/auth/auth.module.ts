import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from './users.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { EncoderService } from './encoder.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmExModule.forCustomRepository([UsersRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, EncoderService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
