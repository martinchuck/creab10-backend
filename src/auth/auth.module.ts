import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from './users.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UsersRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
