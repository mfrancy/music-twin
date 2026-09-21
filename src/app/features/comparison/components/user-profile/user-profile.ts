import { Component, input } from '@angular/core';
import { UserInfoResponse } from '../../models/lastfmresponse.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfileComponent {
  user = input<UserInfoResponse | null>(null)
}
