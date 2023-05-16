import { IsNotEmpty} from 'class-validator';
export class CreateTicketDTO {

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  eventId: string;
}
