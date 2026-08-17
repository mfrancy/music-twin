import { Component, input } from '@angular/core';
import { UserProfile } from '../../models/user-profile.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfileComponent {
  user = input<UserProfile | null>(null)
}
