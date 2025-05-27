import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  queue_name: string;

  @Column()
  instance: string;

  @Column({ type: 'timestamp' })
  verification_date: Date;

  @Column()
  status: boolean;

  @Column({ type: 'timestamp', nullable: true })
  connection_date: Date | null;

  @Column({ default: 0 })
  waiting_chats: number;
}
