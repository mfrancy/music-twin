import { HttpClient, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../../core/config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  http = inject(HttpClient);

  getImageUrl(artist: string): Observable<string> {
    return this.http.get(API_CONFIG.backend.spotifyUrl, {
      params: {
        artistName: artist
      },
      responseType: 'text'
    })

  }

}
