import { Component, inject, input, signal } from '@angular/core';
import { ComparisonInput } from '../../models/comparison-input';
import { ComparisonForm } from '../../components/comparison/comparison-form';
import { LastfmService } from '../../services/lastfm.service';
import { forkJoin } from 'rxjs';
import { ComparisonService } from '../../services/comparison.service';
import { ComparisonStats } from '../../models/comparison-stats.interface';
import { UserProfile } from '../../models/user-profile.interface';
import { UserProfileComponent } from '../../components/user-profile/user-profile';
import { ComparisonResultsComponent } from '../../components/comparison-results/comparison-results';
import { Artist } from '../../models/artists.interface';

@Component({
  selector: 'app-comparison-page',
  imports: [ComparisonForm, UserProfileComponent, ComparisonResultsComponent],
  templateUrl: './comparison-page.html',
  styleUrl: './comparison-page.scss',
})

export class ComparisonPage {
  lastfmService = inject(LastfmService);
  comparisonService = inject(ComparisonService);
  comparisonStats = signal<ComparisonStats | null>(null);
  commomArtists = signal<Artist[] | null>([])
  userProfile = signal<UserProfile | null>(null);
  otherUserProfile = signal<UserProfile | null>(null);
  userArtists = signal<Artist[]>([]);
  otherUserArtists = signal<Artist[]>([]);
  loading = false;

  onCompare(event: ComparisonInput): void {
    this.loadComparisonData(event)

  }

  loadComparisonData(profile: ComparisonInput) {
    this.loading = true;
    const user$ = this.lastfmService.getUserInfo(profile.user);
    const otherUser$ = this.lastfmService.getUserInfo(profile.otherUser);
    const userArtists$ = this.lastfmService.getTopArtists(profile.user);
    const otherUserArtists$ = this.lastfmService.getTopArtists(profile.otherUser); 

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
        const findCommom = this.comparisonService.findCommonArtists(response.userArtists, response.otherUserArtists)
        this.userProfile.set(user);
        this.otherUserProfile.set(otherUser);
        this.comparisonStats.set(comparision);
        this.commomArtists.set(findCommom);
        this.loading = false
      }, error: err => {
        this.loading = false
      }
    })

  }

  // loadArtist(profile: ComparisonInput) {
  //   this.loading = true;
  //   const user$ = this.lastfmService.getUserInfo(profile.user);
  //   const otherUser$ = this.lastfmService.getUserInfo(profile.otherUser);
  //   const userArtists$ = this.lastfmService.getTopArtists(profile.user);
  //   const otherUserArtists$ = this.lastfmService.getTopArtists(profile.otherUser);

  //   forkJoin({
  //     user: user$,
  //     otherUser: otherUser$,
  //     userArtists: userArtists$,
  //     otherUserArtists: otherUserArtists$
  //   }).subscribe({
  //     next: (response) => {
  //       const user = response.user;
  //       const otherUser = response.otherUser;
  //       const comparision = this.comparisonService.compare(user, otherUser);
  //       this.userArtists.set(user);
  //       this.otherUserProfile.set(otherUser);
  //       this.comparisonStats.set(comparision);
  //       this.loading = false
  //     }, error: err => {
  //       this.loading = false
  //     }
  //   })
  // }

}
