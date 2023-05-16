import { IsEmail, IsJWT, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator";

export class LoginAuthDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  readonly password: string;

}


export class Token {

  @IsNotEmpty()
  @IsJWT()
  readonly token: string;

}

export class TokenStructure {

  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly role: string;

}