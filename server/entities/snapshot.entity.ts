import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from './track.entity';

@Entity()
export class Snapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  userId: number;

  @OneToMany(() => Track, (track) => track.snapshot, { cascade: true })
  tracks: Track[];
}
