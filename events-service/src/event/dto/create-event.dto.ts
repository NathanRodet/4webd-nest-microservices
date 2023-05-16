import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateEventDto {

  @IsNotEmpty()
  @IsString()
  @Length(3, 250)
  titre: string;

  @IsString()
  @Length(3, 1550)
  description: string;

  @IsNotEmpty()
  dateDebut: Date;

  @IsNotEmpty()
  dateFin: Date;

  @IsNotEmpty()
  ticketsDisponible: number;

  @IsNotEmpty()
  @IsInt()
  price: number;

}
