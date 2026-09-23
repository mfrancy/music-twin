import { Injectable } from '@angular/core';
import { ComparisonStats } from '../models/comparison-stats.interface';
import { TopArtistsResponse, UserInfoResponse } from '../models/lastfmresponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ComparisonService {

  compareMainStats(user: UserInfoResponse, otherUser: UserInfoResponse): ComparisonStats {
    const playCountDifference = Math.abs(user.playCount - otherUser.playCount)
    const artistCountDifference = Math.abs(user.artistCount - otherUser.artistCount)
    const trackCountDifference = Math.abs(user.trackCount - otherUser.trackCount)

    const morePlayCount =
      user.playCount > otherUser.playCount
        ? user.username
        : otherUser.username;

    const moreArtists =
      user.artistCount > otherUser.artistCount
        ? user.username
        : otherUser.username;

    const moreTracks =
      user.trackCount > otherUser.trackCount
        ? user.username
        : otherUser.username;

    const result = {
      playCountDifference,
      artistCountDifference,
      trackCountDifference,
      morePlayCount,
      moreArtists,
      moreTracks
    }

    return result
  }

  findCommonArtists(userArtists: TopArtistsResponse[],
    otherUserArtists: TopArtistsResponse[]): TopArtistsResponse[] {

    return userArtists.filter(
      userArtists => otherUserArtists.some(otherArtist => otherArtist.name === userArtists.name)
    );
  }
}
