// import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from 'src/core/entities';
// import { Repository } from 'typeorm/repository/Repository';
// import { TypeORMGenericRepository } from './typeorm-generic-repository';


// @Injectable()
// export class TypeORMDataServices
//   implements IDataServices, OnApplicationBootstrap {
//   users: TypeORMGenericRepository<User>;

//   constructor(
//     @InjectRepository(User.name)
//     private UserRepository: Repository<User>,
//   ) { }

//   onApplicationBootstrap() {
//     this.Users = new TypeORMGenericRepository<User>(this.UserRepository);
//   }
// }