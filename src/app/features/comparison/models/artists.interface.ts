export interface Artist {
    name: string;
    playCount: number;
    image: string;
    rank: string;
}

interface CommonArtist {
  artist: Artist;
  otherRank: number;
  otherPlayCount: number;
}

