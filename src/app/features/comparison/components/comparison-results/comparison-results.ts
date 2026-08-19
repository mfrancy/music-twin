import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ComparisonStats } from '../../models/comparison-stats.interface';
import { UserProfile } from '../../models/user-profile.interface';

@Component({
  selector: 'app-comparison-results',
  imports: [DecimalPipe],
  templateUrl: './comparison-results.html',
  styleUrl: './comparison-results.scss',
})
export class ComparisonResultsComponent {
  stats = input<ComparisonStats | null>(null);
  user = input<UserProfile | null>(null);
  otherUser = input<UserProfile | null>(null);

}
