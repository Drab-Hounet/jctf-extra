import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../../shared/component/header/header.component';
import {TokenUtilityClass} from '../../../shared/Utils/tokenUtilityClass';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inscription-layout',
  imports: [HeaderComponent],
  standalone: true,
  templateUrl: './inscription-layout.component.html',
  styleUrl: './inscription-layout.component.scss'
})
export class InscriptionLayoutComponent implements OnInit {
  private tokenUtilityClass!: TokenUtilityClass;
  _token!:string;
  _pseudo!:string;

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
