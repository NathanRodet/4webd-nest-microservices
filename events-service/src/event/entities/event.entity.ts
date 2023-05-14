import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  titre: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  dateDebut: Date;

  @Column({ nullable: false })
  dateFin: Date;

  @Column({ nullable: false })
  ticketsDisponible: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  paymentLink: string;


}
export default Event;
