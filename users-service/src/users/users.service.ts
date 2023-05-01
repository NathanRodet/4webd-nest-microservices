const argon2 = require('argon2');
import { Injectable } from '@nestjs/common';
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

    const userData = {
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    }

    return await this.usersRepository.save(this.usersRepository.create(userData));
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, UpdatePasswordUserDto: UpdatePasswordUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}