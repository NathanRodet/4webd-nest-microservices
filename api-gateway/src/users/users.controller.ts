import { Controller, Headers, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordUserDto } from './dto/update-user.dto';
import { UUID } from './dto/params-user.dto';
import { Roles } from '../auth/guards/auth.decorator';
import { Role } from '../auth/guards/auth.enum';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll(@Headers() headers: any) {
    return this.usersService.findAll(headers);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param() id: UUID, @Headers() headers: any) {
    return this.usersService.findOne(id.id, headers);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  update(@Param() id: UUID, @Body() UpdatePasswordUserDto: UpdatePasswordUserDto, @Headers() headers: any) {
    return this.usersService.update(id.id, UpdatePasswordUserDto, headers);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER)
  remove(@Param() id: UUID, @Headers() headers: any) {
    return this.usersService.remove(id.id, headers);
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