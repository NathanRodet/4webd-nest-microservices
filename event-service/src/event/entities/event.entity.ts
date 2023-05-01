import { Column, PrimaryGeneratedColumn } from 'typeorm';
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    titre:string;
  
    @Column()
    description: string;
  
    @Column()
    ticketsDisponible: number;

    @Column()
    dateDebut: Date;
    
    @Column()
    dateFin: Date;
}
export default Event;
