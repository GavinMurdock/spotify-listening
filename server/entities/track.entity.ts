import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist.entity';
import { Snapshot } from './snapshot.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  snapshotId: number;

  @OneToMany(() => Artist, (artist) => artist.track, { cascade: true })
  artists: Artist[];

  @ManyToOne(() => Snapshot, (snapshot) => snapshot.tracks)
  snapshot: Snapshot;
}
