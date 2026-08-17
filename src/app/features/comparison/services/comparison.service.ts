import { Injectable } from '@angular/core';
import { UserProfile } from '../models/user-profile.interface';
import { ComparisonStats } from '../models/comparison-stats.interface';
import { Artist } from '../models/artists.interface';

@Injectable({
  providedIn: 'root',
})
export class ComparisonService {

  compareMainStats(user: UserProfile, otherUser: UserProfile): ComparisonStats {
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

  findCommonArtists(userArtists: Artist[],
    otherUserArtists: Artist[]): Artist[] {

    return userArtists.filter(
      userArtists => otherUserArtists.some(otherArtist => otherArtist.name === userArtists.name)
      );
  }
}
