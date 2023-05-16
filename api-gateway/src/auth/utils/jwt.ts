import { HttpException, HttpStatus } from "@nestjs/common";
import { Token, TokenStructure } from "../dto/auth.dto";
export const JWT_SECRET = 'secret';

let jwt = require('jsonwebtoken');

export async function GenerateToken(params: TokenStructure): Promise<Token> {
  try {
    return await jwt.sign({
      id: params.id,
      role: params.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, JWT_SECRET);
  } catch (error) {
    throw new HttpException({ message: 'Error generating token' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function VerifyToken(token: Token): Promise<boolean> {
  try {
    const verified: boolean = await jwt.verify(token, JWT_SECRET);
    return verified;
  } catch (error) {
    throw new HttpException({ message: 'Token is expired or invalid' }, HttpStatus.UNAUTHORIZED);
  }
}

export async function DecodeToken(token: Token): Promise<TokenStructure> {
  try {
    return await jwt.decode(token);
  } catch (error) {
    throw new HttpException({ message: 'Error decoding token' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}