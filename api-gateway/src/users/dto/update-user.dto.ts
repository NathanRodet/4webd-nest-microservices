import { IsNotEmpty, IsStrongPassword, IsUUID } from 'class-validator';

export class UpdatePasswordUserDto {

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  readonly password: string;

}

export class AddTicketUserDto {

  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

}