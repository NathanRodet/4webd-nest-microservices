import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../core/entities';
import { CreateUserDto, UpdateUserDto } from '../../core/dtos';
import { UserFactoryService } from './user-factory.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserUseCases {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private UserFactoryService: UserFactoryService,
  ) { }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    let User = await this.getUserByEmail(createUserDto.email);
    if (!User)
      throw new HttpException({ message: 'User already exist' }, HttpStatus.BAD_REQUEST);

    User = this.UserFactoryService.createNewUser(createUserDto);

    await this.userRepository.save(User);
    return Promise.resolve();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    let User = await this.userRepository.findOneBy({ id });
    if (!User)
      throw new HttpException({ message: 'User does not exist' }, HttpStatus.BAD_REQUEST);

    User = this.UserFactoryService.updateUser(updateUserDto);
    User.id = id;

    await this.userRepository.save(User);
    return Promise.resolve();
  }

  async deleteUser(id: string): Promise<void> {
    const User = await this.userRepository.findOneBy({ id });
    if (!User)
      throw new HttpException({ message: 'User does not exist' }, HttpStatus.BAD_REQUEST);

    await this.userRepository.remove(User);
    return Promise.resolve();
  }
}