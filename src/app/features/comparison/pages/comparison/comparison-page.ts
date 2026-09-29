import { Component, inject, input, signal } from '@angular/core';
import { ComparisonInput } from '../../models/comparison-input';
import { ComparisonForm } from '../../components/comparison/comparison-form';
import { LastfmService } from '../../services/lastfm.service';
import { catchError, forkJoin, of, throwError } from 'rxjs';
import { ComparisonService } from '../../services/comparison.service';
import { ComparisonCommonArtist, ComparisonStats } from '../../models/comparison-stats.interface';
import { UserProfile } from '../../models/user-profile.interface';
import { UserProfileComponent } from '../../components/user-profile/user-profile';
import { ComparisonResultsComponent } from '../../components/comparison-results/comparison-results';
import { Artist } from '../../models/artists.interface';
import { ArtistsComparisonComponent } from '../../components/artists-comparison/artists-comparison';
import { TopArtistsResponse, UserInfoResponse } from '../../models/lastfmresponse.interface';
import Swal from 'sweetalert2';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-comparison-page',
  imports: [ComparisonForm, UserProfileComponent, ComparisonResultsComponent, ArtistsComparisonComponent],
  templateUrl: './comparison-page.html',
  styleUrl: './comparison-page.scss',
})

export class ComparisonPage {
  lastfmService = inject(LastfmService);
  spotifyService = inject(SpotifyService);
  comparisonService = inject(ComparisonService);
  comparisonStats = signal<ComparisonStats | null>(null);
  commonArtists = signal<ComparisonCommonArtist[] | null>([])

  userProfile = signal<UserInfoResponse | null>(null);
  otherUserProfile = signal<UserInfoResponse | null>(null);
  userArtists = signal<TopArtistsResponse[]>([]);
  otherUserArtists = signal<TopArtistsResponse[]>([]);
  loading = false;

  onCompare(event: ComparisonInput): void {
    this.loadComparisonData(event)
  }

  loadComparisonData(profile: ComparisonInput) {
    this.loading = true;
    const user$ = this.lastfmService.getUserInfo(profile.user).pipe(
      catchError(err => this.handleUserNotFound(err, profile.user)
      ));

    const otherUser$ = this.lastfmService.getUserInfo(profile.otherUser).pipe(
      catchError(err => this.handleUserNotFound(err, profile.otherUser)
      ));

    const userArtists$ = this.lastfmService.getTopArtists(profile.user).pipe(
      catchError(err => this.handleUserNotFound(err, profile.user)
      ));
    const otherUserArtists$ = this.lastfmService.getTopArtists(profile.otherUser).pipe(
      catchError(err => this.handleUserNotFound(err, profile.otherUser)
      ));

    forkJoin({
      user: user$,
      otherUser: otherUser$,
      userArtists: userArtists$,
      otherUserArtists: otherUserArtists$
    }).subscribe({
      next: (response) => {
        const user = response.user;
        const otherUser = response.otherUser;
        const comparision = this.comparisonService.compareMainStats(user, otherUser)
        const findCommom = this.comparisonService.findTotalCommonArtists(response.userArtists, response.otherUserArtists)
        this.userProfile.set(user);
        this.otherUserProfile.set(otherUser);
        this.comparisonStats.set(comparision);
        this.userArtists.set(response.userArtists);
        this.otherUserArtists.set(response.otherUserArtists);
        const imageRequests$ = findCommom.map(artist =>
          this.spotifyService.getImageUrl(artist.name).pipe(
            catchError(() => of(null))
          )
        );

        if (imageRequests$.length === 0) {
          this.commonArtists.set([]);
          this.loading = false;
          return;
        }

        forkJoin(imageRequests$).subscribe({
          next: images => {
            this.commonArtists.set(findCommom.map((artist, index) => ({
              ...artist,
              image: images[index]
            })));
            this.loading = false;
          },
          error: () => {
            // Individual image errors are converted to null above.
            this.commonArtists.set(findCommom.map(artist => ({ ...artist, image: null })));
            this.loading = false;
          }
        });


      }, error: err => {
        this.loading = false
        if (err.status === 404) {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: 'Usuário não encontrado',
            text: `O usuário "${err.username}" não foi encontrado no Last.fm`,
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true
          });
        } else if (err.status === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Erro de conexão',
            text: 'Não foi possível conectar ao servidor. Tente novamente.',
            confirmButtonText: 'Entendi'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Algo deu errado',
            text: 'Não foi possível realizar a comparação. Tente novamente.',
            confirmButtonText: 'Entendi'
          });
        }

      }
    })
  }

  private handleUserNotFound(err: any, username: string) {
    if (err.status === 404) {
      return throwError(() => ({
        status: 404,
        username
      }));
    }

    return throwError(() => err);
  }

}
