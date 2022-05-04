import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from './track.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  trackId: number;

  @ManyToOne(() => Track, (track) => track.artists)
  track: Track;
}
