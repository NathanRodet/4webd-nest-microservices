import { IsNotEmpty, IsNumber, IsPositive, IsString, Length } from 'class-validator';
export class CreateTicketDTO {

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  eventId: string;
}
