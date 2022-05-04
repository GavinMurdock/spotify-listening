import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnapshotsController } from 'server/controllers/snapshots.controller';
import { Artist } from 'server/entities/artist.entity';
import { Snapshot } from 'server/entities/snapshot.entity';
import { Track } from 'server/entities/track.entity';
import { SnapshotsService } from 'server/providers/services/snapshots.service';
import { UsersService } from 'server/providers/services/users.service';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Snapshot, Track, Artist])],
  controllers: [SnapshotsController],
  providers: [SnapshotsService, UsersService],
  exports: [TypeOrmModule],
})
export class SnapshotsModule {}
