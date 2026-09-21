import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Artist } from '../../models/artists.interface';
import { TopArtistsResponse } from '../../models/lastfmresponse.interface';

@Component({
  selector: 'app-artists-comparison',
  imports: [DecimalPipe],
  templateUrl: './artists-comparison.html',
  styleUrl: './artists-comparison.scss',
})
export class ArtistsComparisonComponent {
  userArtists = input<TopArtistsResponse[]>([]);
  otherUserArtists = input<TopArtistsResponse[]>([]);
  commonArtists = input<TopArtistsResponse[]>([]);
}
