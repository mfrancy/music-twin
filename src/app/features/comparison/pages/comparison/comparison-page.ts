import { Component, EventEmitter, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComparisonInput } from '../../models/comparison-input';
import { form } from '@angular/forms/signals';
import { ComparisonForm } from '../../components/comparison/comparison-form';
import { LastfmService } from '../../services/lastfm.service';
import { forkJoin } from 'rxjs';
import { ComparisonService } from '../../services/comparison.service';
import { ComparisonStats } from '../../models/comparison-stats.interface';

@Component({
  selector: 'app-comparison-page',
  imports: [ReactiveFormsModule, ComparisonForm],
  templateUrl: './comparison-page.html',
  styleUrl: './comparison-page.scss',
})

export class ComparisonPage {
  lastfmService = inject(LastfmService);
  comparisonService = inject(ComparisonService);
  comparisonStats: ComparisonStats | null = null 

  onCompare(event: ComparisonInput) {
    const user$ = this.lastfmService.getUserInfo(event.user);
    const otherUser$ = this.lastfmService.getUserInfo(event.otherUser);

    forkJoin({
      user: user$,
      otherUser: otherUser$
    }).subscribe({
      next: (response) => {
        const user = response.user;
        const otherUser = response.otherUser;
        const comparision = this.comparisonService.compare(user, otherUser)
        console.log(comparision)
        this.comparisonStats = comparision
      }, error: err => {
        console.log(err)
      }
    })

  }

}