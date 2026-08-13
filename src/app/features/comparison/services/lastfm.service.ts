import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../../core/config/api.config';
import { environment } from '../../../../environments/environment.development';
import { GetUserInfoResponse, ImageResponse } from '../models/lastfmresponse.interface';
import { UserProfile } from '../models/user-profile.interface';
import { map } from 'rxjs';

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

}


