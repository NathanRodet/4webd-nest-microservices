import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  @Column()
  eventId: number;
}
