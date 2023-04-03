// import { Repository } from 'typeorm/repository/Repository';

// export class TypeORMGenericRepository<T> {
//   private _repository: Repository<T>;

//   constructor(repository: Repository<T>) {
//     this._repository = repository;
//   }

//   getAll(): Promise<T[]> {
//     return this._repository.find()
//   }

//   get(params: any): Promise<T> {
//     return this._repository.findOneBy(params);
//   }

//   create(item: T): Promise<T> {
//     return this._repository.save(item);
//   }

//   update(item: T): Promise<T> {
//     return this._repository.save(item);
//   }

//   delete(item: T): Promise<T> {
//     return this._repository.remove(item);
//   }
// }