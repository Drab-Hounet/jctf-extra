import {Component, Input, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';
import {TokenUtilityClass} from '../../Utils/tokenUtilityClass';
import {TooltipModule} from 'primeng/tooltip';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, TooltipModule, NgIf],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private tokenUtilityClass!: TokenUtilityClass;
  private _token!: string;
  private _pseudo!: string;


  @Input() public iPseudo = '';

  _isProfilSelected = false;

  @Input()
  get iProfilSelected(): boolean {
    return this._isProfilSelected;
  }

  set iProfilSelected(value: boolean) {
    this._isProfilSelected = value;
  }

  _isInscriptionSelected = true;

  @Input()
  get iInscriptionSelected(): boolean {
    return this._isInscriptionSelected;
  }

  set iInscriptionSelected(value: boolean) {
    this._isInscriptionSelected = value;
  }

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.tokenUtilityClass = new TokenUtilityClass(this.router);
    this.getInformationToken();
  }

  /**
   * Get token informations
   */
  getInformationToken(): void {
    this.tokenUtilityClass.getInformationToken();
    this._token = this.tokenUtilityClass._token;
    this._pseudo = this.tokenUtilityClass._pseudo;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout(): void {
    localStorage.removeItem('currentJCTF');
    this.navigateTo('login');
  }
}
