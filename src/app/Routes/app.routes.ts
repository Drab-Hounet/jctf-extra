import {Routes} from '@angular/router';
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
import {ProfileLayoutComponent} from '../profile/container/profile-layout/profile-layout.component';
import {InscriptionNewComponent} from '../inscription/container/inscription-new/inscription-new.component';
import {PaymentLayoutComponent} from '../payment/container/payment-layout/payment-layout.component';
import {PaymentVerificationComponent} from '../payment/container/payment-verification/payment-verification.component';

export const routes: Routes = [
  {path: '*', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inscription', component: InscriptionLayoutComponent, canActivate: [AuthGuard]},
  {path: 'inscription/new/:id', component: InscriptionNewComponent, canActivate: [AuthGuard]},
  {path: 'new', component: NewUserLayoutComponent},
  {path: 'profile', component: ProfileLayoutComponent, canActivate: [AuthGuard]},
  {path: 'inscription/payment/verification/:id', component: PaymentVerificationComponent, canActivate: [AuthGuard]},
  {path: 'inscription/payment/:id', component: PaymentLayoutComponent, canActivate: [AuthGuard]},
  {
    path: 'forgotPassword',
    children: [
      {path: '', component: ForgotPasswordEntryPointComponent},
      {path: 'request', component: ForgotPasswordLayoutComponent},
      {path: 'reset', component: ForgotPasswordResetComponent},
    ]
  },
  {path: '**', redirectTo: '/login'} // to redirect all paths unknown
];
