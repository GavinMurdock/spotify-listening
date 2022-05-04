import { Controller, Get, Param, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { SnapshotsService } from 'server/providers/services/snapshots.service';
import fetch from 'node-fetch';

@Controller()
export class SnapshotsController {
  constructor(private snapshotsService: SnapshotsService) {}

  @Get('/snapshots')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    const snapshots = await this.snapshotsService.getUsersSnapshots(jwtBody.userId);
    return { snapshots };
  }

  @Get('/snapshots/:id')
  public async getSnapshot(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const snapshot = await this.snapshotsService.getSnapshot(parseInt(id), jwtBody.userId);
    return { snapshot };
  }

  @Get('/tracks/:id')
  public async getTracks(@Param('id') id: string) {
    const tracks = await this.snapshotsService.getSnapshotTracks(parseInt(id));
    return { tracks };
  }

  @Get('/artists/:id')
  public async getArtists(@Param('id') id: string) {
    const artists = await this.snapshotsService.getTrackArtists(parseInt(id));
    return { artists };
  }

  @Post('/snapshots/:accessToken')
  public async create(@JwtBody() jwtBody: JwtBodyDto, @Param('accessToken') accessToken: string) {
    await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10&offset=0&time_range=short_term', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then((res) => res.json())
      .then(async (json) => {
        await this.snapshotsService.create(json, jwtBody.userId);
      });
  }
}
