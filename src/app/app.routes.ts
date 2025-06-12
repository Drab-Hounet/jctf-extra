import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {InscriptionLayoutComponent} from './inscription/container/inscription-layout/inscription-layout.component';
import {NewUserComponent} from './new/container/new-user/new-user.component';

export const routes: Routes = [
  {path: '*', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inscription', component: InscriptionLayoutComponent},
  {path: 'new', component: NewUserComponent},
  {path: '**', redirectTo: '/login'} // to redirect all paths unknown
];
