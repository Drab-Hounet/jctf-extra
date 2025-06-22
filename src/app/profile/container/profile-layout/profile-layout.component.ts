import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../../shared/component/header/header.component';
import {TokenUtilityClass} from '../../../shared/Utils/tokenUtilityClass';
import {Router} from '@angular/router';
import {ProfileHistoryComponent} from '../profile-history/profile-history.component';
import {ProfileDetailsComponent} from '../profile-details/profile-details.component';

@Component({
  selector: 'app-profile-layout',
  imports: [HeaderComponent, ProfileHistoryComponent, ProfileDetailsComponent],
  standalone: true,
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.scss'
})
export class ProfileLayoutComponent implements OnInit {
  private tokenUtilityClass!: TokenUtilityClass;
  _token!: string;
  _pseudo!: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.tokenUtilityClass = new TokenUtilityClass(this.router);
    this.getInformationToken();
  }

  getInformationToken(): void {
    this.tokenUtilityClass.getInformationToken();
    this._token = this.tokenUtilityClass._token;
    this._pseudo = this.tokenUtilityClass._pseudo;
  }
}
