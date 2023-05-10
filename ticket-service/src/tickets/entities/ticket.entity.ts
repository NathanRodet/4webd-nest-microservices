import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  userId: string;

  @Column({ unique: true, nullable: false })
  eventId: string;

}
export default Ticket;
