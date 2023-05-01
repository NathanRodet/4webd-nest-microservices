import { IsNotEmpty, IsString, Length } from "class-validator";
export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 250)
    titre: string;

    @IsString()
    @Length(3, 550)
    description: string;

    @IsNotEmpty()
    ticketsDisponible: number;

    @IsNotEmpty()
    DateDebut: Date;

    @IsNotEmpty()
    DateFin: Date;
}
