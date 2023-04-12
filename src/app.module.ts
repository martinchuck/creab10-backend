import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'data-source';
import { CategoryModule } from './Categories/category.module';
import { UsersModule } from './Users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { UsersRepository } from './auth/users.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    CategoryModule,
    AuthModule,
    TypeOrmExModule.forCustomRepository([UsersRepository]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
