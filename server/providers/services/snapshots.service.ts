import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Snapshot } from 'server/entities/snapshot.entity';
import { Repository } from 'typeorm';
import { Track } from 'server/entities/track.entity';
import { Artist } from 'server/entities/artist.entity';

@Injectable()
export class SnapshotsService {
  constructor(
    @InjectRepository(Snapshot)
    private snapshotsRepository: Repository<Snapshot>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  find(id: number, relations: string[] = []) {
    return this.snapshotsRepository.findOne(id, { relations });
  }

  async getUsersSnapshots(userId: number) {
    return await this.snapshotsRepository.find({
      where: {
        userId: userId,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async getSnapshot(id: number, userId: number) {
    const snapshot = await this.snapshotsRepository.findOne(id);
    if (snapshot.userId === userId) {
      return snapshot;
    }
    return;
  }

  async getSnapshotTracks(snapshotId: number) {
    return await this.tracksRepository.find({
      where: {
        snapshotId: snapshotId,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async getTrackArtists(trackId: number) {
    return await this.artistsRepository.find({
      where: {
        trackId: trackId,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async create(snapshotPayload: any, userId: number) {
    const snapshot = new Snapshot();
    const today = new Date();
    snapshot.date = today.getMonth() + '-' + today.getDate() + '-' + today.getFullYear();
    snapshot.userId = userId;
    await this.snapshotsRepository.save(snapshot);
    const snapshotId = snapshot.id;
    for (const i in snapshotPayload['items']) {
      const track = new Track();
      track.snapshotId = snapshotId;
      track.title = snapshotPayload['items'][i].name;
      await this.tracksRepository.save(track);
      const trackId = track.id;
      for (const j in snapshotPayload['items'][i]['artists']) {
        const artist = new Artist();
        artist.trackId = trackId;
        artist.name = snapshotPayload['items'][i]['artists'][j].name;
        await this.artistsRepository.save(artist);
      }
    }
  }
}
