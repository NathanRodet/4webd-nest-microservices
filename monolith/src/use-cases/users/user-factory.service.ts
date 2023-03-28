import { Injectable } from '@nestjs/common';
import { User } from '../../core/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../core/dtos/user.dto';

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;

    return newUser;
  }

  updateUser(updateUserDto: UpdateUserDto) {
    const newUser = new User();
    newUser.firstName = updateUserDto.firstName;
    newUser.lastName = updateUserDto.lastName;
    newUser.password = updateUserDto.password;

    return newUser;
  }
}