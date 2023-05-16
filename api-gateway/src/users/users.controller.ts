import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordUserDto } from './dto/update-user.dto';
import { UUID } from './dto/params-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: UUID) {
    return this.usersService.findOne(id.id);
  }

  @Patch(':id')
  update(@Param() id: UUID, @Body() UpdatePasswordUserDto: UpdatePasswordUserDto) {
    return this.usersService.update(id.id, UpdatePasswordUserDto);
  }

  @Delete(':id')
  remove(@Param() id: UUID) {
    return this.usersService.remove(id.id);
  }
}


@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createAdmin(createUserDto);
  }

}