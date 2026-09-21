import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../../core/config/api.config';
import { environment } from '../../../../environments/environment.development';
import { TopArtistsResponse, UserInfoResponse } from '../models/lastfmresponse.interface';
import { UserProfile } from '../models/user-profile.interface';
import { map } from 'rxjs';
import { Artist } from '../models/artists.interface';

@Injectable({
  providedIn: 'root',
})
export class LastfmService {
  http = inject(HttpClient);


  getUserInfo(username: string) {
    return this.http.get<UserInfoResponse>(API_CONFIG.backend.baseUrl + `?username=${username}`)
  }
  

  getTopArtists(username: string) {
    return this.http.get<TopArtistsResponse[]>(API_CONFIG.backend.baseUrl + `/top-artists?username=${username}`)
  }

}


