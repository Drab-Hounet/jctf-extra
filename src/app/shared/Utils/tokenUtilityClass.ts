import { delay } from 'q';
import {TokenModel} from '../../models/tokenModel';
import {Router} from '@angular/router';

export class TokenUtilityClass {

  public _pseudo = '';
  public _token = '';
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  /**
   * retrieve the token from the local storage and store it in the class
   */
  getInformationToken() {
    const storage = localStorage.getItem('currentUser');
    if (storage) {
      const token: TokenModel = JSON.parse(storage);
      if (token) {
        this._pseudo = token.username;
        this._token = token.auth;
      } else {
        this._pseudo = '';
        this._token = '';
      }
    } else {
      this._pseudo = '';
      this._token = '';
    }
  }

  /**
   * redirect to the login page
   */
  async redirectToLogin() {
    await delay(1000);
    localStorage.removeItem('currentUser');
    this._router.navigate(['login']).then();
  }
}
