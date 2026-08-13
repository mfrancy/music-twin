import { Injectable } from '@angular/core';
import { UserProfile } from '../models/user-profile.interface';
import { ComparisonStats } from '../models/comparison-stats.interface';

@Injectable({
  providedIn: 'root',
})
export class ComparisonService {

  compare(user: UserProfile, otherUser: UserProfile): ComparisonStats {
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

}
