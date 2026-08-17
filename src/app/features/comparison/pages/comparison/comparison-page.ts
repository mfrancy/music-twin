import { Component, inject } from '@angular/core';
import { ComparisonInput } from '../../models/comparison-input';
import { ComparisonForm } from '../../components/comparison/comparison-form';
import { LastfmService } from '../../services/lastfm.service';
import { forkJoin } from 'rxjs';
import { ComparisonService } from '../../services/comparison.service';
import { ComparisonStats } from '../../models/comparison-stats.interface';
import { UserProfile } from '../../models/user-profile.interface';
import { UserProfileComponent } from '../../components/user-profile/user-profile';
import { ComparisonResultsComponent } from '../../components/comparison-results/comparison-results';

@Component({
  selector: 'app-comparison-page',
  imports: [ComparisonForm, UserProfileComponent, ComparisonResultsComponent],
  templateUrl: './comparison-page.html',
  styleUrl: './comparison-page.scss',
})

export class ComparisonPage {
  lastfmService = inject(LastfmService);
  comparisonService = inject(ComparisonService);
  comparisonStats: ComparisonStats | null = null 
  userProfile: UserProfile | null = null;
  otherUserProfile: UserProfile | null = null;
  loading = false

  onCompare(event: ComparisonInput) {
    const user$ = this.lastfmService.getUserInfo(event.user);
    const otherUser$ = this.lastfmService.getUserInfo(event.otherUser);
    this.loading = true

    forkJoin({
      user: user$,
      otherUser: otherUser$
    }).subscribe({
      next: (response) => {
        this.loading = false
        const user = response.user;
        const otherUser = response.otherUser;
        const comparision = this.comparisonService.compare(user, otherUser)
        this.userProfile = user;
        this.otherUserProfile = otherUser;
        this.comparisonStats = comparision
      }, error: err => {
        this.loading = false
        console.log(err)
      }
    })

  }

}
