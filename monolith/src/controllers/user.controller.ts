import { Controller, Get, Param, Post, Body, Put, ValidationPipe, UsePipes, Delete } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../core/dtos/user.dto';
import { UserUseCases } from '../use-cases/users/user.use-case';

@Controller('user')
export class UserController {
  constructor(private UserUseCases: UserUseCases) { }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async getAll() {
    return this.UserUseCases.getAllUsers();
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.UserUseCases.getUserById(id);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createUser(
    @Body() UserDto: CreateUserDto) {
    return this.UserUseCases.createUser(UserDto);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Put(':id')
  async updateUser(
    @Param('id') UserId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.UserUseCases.updateUser(UserId, updateUserDto);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(':id')
  async deleteUser(
    @Param('id') UserId: string,

  ) {
    return this.UserUseCases.deleteUser(UserId);
  }
}