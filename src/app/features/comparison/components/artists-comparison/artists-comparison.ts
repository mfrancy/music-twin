import { Component, computed, input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Artist } from '../../models/artists.interface';

@Component({
  selector: 'app-artists-comparison',
  imports: [DecimalPipe],
  templateUrl: './artists-comparison.html',
  styleUrl: './artists-comparison.scss',
})
export class ArtistsComparisonComponent {
  userArtists = input<Artist[]>([]);
  otherUserArtists = input<Artist[]>([]);
  commonArtists = input<Artist[]>([]);
  userName = input('Usuário A');
  otherUserName = input('Usuário B');
  commomLimit: number = 5;
  selectedLimit = signal<number>(5);



  visibleUserArtists = computed(() => {
    return this.userArtists().slice(0, this.selectedLimit())
  });

  visibleOtherUserArtists = computed(() => {
    return this.otherUserArtists().slice(0, this.selectedLimit())
  });

  onLimitChange(event: Event) {
    const selected = (event.target as HTMLInputElement).value
    this.selectedLimit.set(Number(selected));
  }

  visibleCommomArtists = computed(() => {
    return this.commonArtists().slice(0, this.commomLimit);
  })

}
