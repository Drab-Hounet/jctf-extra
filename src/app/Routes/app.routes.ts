import { Routes } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {InscriptionLayoutComponent} from '../inscription/container/inscription-layout/inscription-layout.component';
import {NewUserLayoutComponent} from '../new/container/new-user-layout/new-user.component-layout';
import {
  ForgotPasswordLayoutComponent
} from '../forgotPassword/container/forgot-password-layout/forgot-password-layout.component';
import {AuthGuard} from './AuthGards';

export const routes: Routes = [
  {path: '*', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inscription', component: InscriptionLayoutComponent, canActivate: [AuthGuard]},
  {path: 'new', component: NewUserLayoutComponent},
  {path: 'forgotPassword', component: ForgotPasswordLayoutComponent},
  {path: '**', redirectTo: '/login'} // to redirect all paths unknown
];
