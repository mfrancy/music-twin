import { Component, input } from '@angular/core';
import { ComparisonStats } from '../../models/comparison-stats.interface';

@Component({
  selector: 'app-comparison-results',
  templateUrl: './comparison-results.html',
  styleUrl: './comparison-results.scss',
})
export class ComparisonResultsComponent {
  stats = input<ComparisonStats | null>(null)

}
