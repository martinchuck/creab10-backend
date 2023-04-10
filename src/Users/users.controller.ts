import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

type UserParam = { id: number };

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  getUser(@Param() params: UserParam): Promise<User | null> {
    return this.usersService.findOne(params.id);
  }

  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete('/:id')
  deleteUser(@Param() params: UserParam): Promise<void> {
    return this.usersService.remove(params.id);
  }

  @Put('/:id')
  updateUser(@Param() params: UserParam, @Body() user: User): Promise<User> {
    return this.usersService.update(params.id, user);
  }
}
