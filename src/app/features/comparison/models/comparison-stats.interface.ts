export interface ComparisonStats {
    playCountDifference: number,
    artistCountDifference: number,
    trackCountDifference: number,
    morePlayCount: string,
    moreArtists: string,
    moreTracks: string
}

export interface ComparisonCommonArtist {
  name: string;
  image: string;
  userRank: number;
  otherUserRank: number;
  playCount: number;
  otherUserPlayCount: number;
}