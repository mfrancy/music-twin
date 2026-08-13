import { Component, EventEmitter, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComparisonInput } from '../../models/comparison-input';
import { form } from '@angular/forms/signals';
import { ComparisonForm } from '../../components/comparison/comparison-form';
import { LastfmService } from '../../services/lastfm.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-comparison-page',
  imports: [ReactiveFormsModule, ComparisonForm],
  templateUrl: './comparison-page.html',
  styleUrl: './comparison-page.scss',
})

export class ComparisonPage {
  lastfmService = inject(LastfmService);

  onCompare(event: ComparisonInput) {
    const user$ = this.lastfmService.getUserInfo(event.user);
    const otherUser$ = this.lastfmService.getUserInfo(event.otherUser);

    forkJoin({
      user: user$,
      otherUser: otherUser$
    }).subscribe({
      next: (response) => {
        console.log(response)
      }, error: err => {
        console.log(err)
      }
    })

  }

}