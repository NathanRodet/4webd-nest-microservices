import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    titre:string;
  
    @Column()
    description: string;
  
    @Column()
    dateDebut: Date;
    
    @Column()
    dateFin: Date;

    @Column()
    ticketsDisponible: number;
}
export default Event;
