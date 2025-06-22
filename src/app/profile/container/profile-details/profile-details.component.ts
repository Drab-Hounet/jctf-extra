import { Component } from '@angular/core';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-profile-details',
  imports: [CardModule],
  standalone: true,
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent {

}
