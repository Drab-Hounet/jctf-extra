import { Routes } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {InscriptionLayoutComponent} from '../inscription/container/inscription-layout/inscription-layout.component';
import {NewUserLayoutComponent} from '../new/container/new-user-layout/new-user.component-layout';
import {AuthGuard} from './AuthGards';
import {
  ForgotPasswordEntryPointComponent
} from '../forgotPassword/container/forgot-password-entry-point/forgot-password-entry-point.component';
import {
  ForgotPasswordLayoutComponent
} from '../forgotPassword/container/forgot-password-layout/forgot-password-layout.component';
import {
  ForgotPasswordResetComponent
} from '../forgotPassword/container/forgot-password-reset/forgot-password-reset.component';

export const routes: Routes = [
  {path: '*', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inscription', component: InscriptionLayoutComponent, canActivate: [AuthGuard]},
  {path: 'new', component: NewUserLayoutComponent},
  {path: 'forgotPassword',
    children: [
      { path: '', component: ForgotPasswordEntryPointComponent },
      { path: 'request', component: ForgotPasswordLayoutComponent },
      { path: 'reset', component: ForgotPasswordResetComponent },
    ]},
  {path: '**', redirectTo: '/login'} // to redirect all paths unknown
];
