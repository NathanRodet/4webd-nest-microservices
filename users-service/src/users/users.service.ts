const argon2 = require('argon2');
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (user)
      throw new HttpException({ message: 'Email already registered.' }, HttpStatus.NOT_FOUND);
    else {
      const userData = {
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password),
      }
      return await this.usersRepository.save(this.usersRepository.create(userData));
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new HttpException({ message: 'User not found.' }, HttpStatus.NOT_FOUND);
    else
      return user;
  }

  async updatePassword(id: string, updatePasswordUserDto: UpdatePasswordUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new HttpException({ message: 'User not found.' }, HttpStatus.NOT_FOUND);
    else {
      const userData = {
        password: await argon2.hash(updatePasswordUserDto.password),
      }
      return await this.usersRepository.update({ id }, userData);
    }
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new HttpException({ message: 'User not found.' }, HttpStatus.NOT_FOUND);
    else
      return await this.usersRepository.delete({ id });
  }
}