import { Injectable } from '@angular/core';
import { ComparisonStats } from '../models/comparison-stats.interface';
import { TopArtistsResponse, UserInfoResponse } from '../models/lastfmresponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ComparisonService {

  compareMainStats(user: UserInfoResponse, otherUser: UserInfoResponse): ComparisonStats {
    const playCountDifference = user.playCount - otherUser.playCount
    const artistCountDifference = user.artistCount - otherUser.artistCount
    const trackCountDifference = user.trackCount - otherUser.trackCount

    const result = {
      playCountDifference,
      artistCountDifference,
      trackCountDifference
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
