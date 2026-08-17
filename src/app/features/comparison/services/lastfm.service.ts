import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../../core/config/api.config';
import { environment } from '../../../../environments/environment.development';
import { ArtistResponse, GetTopArtistsResponse, GetUserInfoResponse, ImageResponse } from '../models/lastfmresponse.interface';
import { UserProfile } from '../models/user-profile.interface';
import { map } from 'rxjs';
import { Artist } from '../models/artists.interface';

@Injectable({
  providedIn: 'root',
})
export class LastfmService {
  http = inject(HttpClient);


  getUserInfo(username: string) {
    return this.http.get<GetUserInfoResponse<ImageResponse>>(API_CONFIG.lastfm.baseUrl, {
      params: {
        method: 'user.getInfo',
        user: username,
        api_key: environment.lastfm.apikey,
        format: 'json'
      }
    }).pipe(map(response => this.mapUserProfile(response)))
  }

  mapUserProfile(data: GetUserInfoResponse<ImageResponse>): UserProfile {
    const image = data.user.image?.find(
      image => image.size === 'extralarge'
    );

    const user = {
      username: data.user.name,
      realName: data.user.realname,
      trackCount: parseInt(data.user.track_count),
      artistCount: parseInt(data.user.artist_count),
      playCount: parseInt(data.user.playcount),
      image: image?.['#text'] ?? 'fallback'
    }

    return user;
  }

  getTopArtists(username: string) {
    return this.http.get<GetTopArtistsResponse<ArtistResponse<ImageResponse>>>(API_CONFIG.lastfm.baseUrl, {
      params: {
        method: 'user.gettopartists',
        user: username,
        'api_key': environment.lastfm.apikey,
        format: 'json'
      }
    }).pipe(map(response => this.mapArtistProfiles(response)))
  }

  mapArtistProfiles(data: GetTopArtistsResponse<ArtistResponse<ImageResponse>>): Artist[] {
    const artists = data.topartists.artist.map(art => {
      const image = art.image.find(img => img.size === 'extralarge');

      const artist: Artist = {
        name: art.name,
        playCount: Number(art.playcount),
        image: image?.['#text'] ?? 'fallback',
        rank: art['@attr'].rank
      }
      return artist;
    })
    return artists;
  }

}


