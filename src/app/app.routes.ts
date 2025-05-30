import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {InscriptionLayoutComponent} from './inscription/container/inscription-layout/inscription-layout.component';

export const routes: Routes = [
  {path: '*', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inscription', component: InscriptionLayoutComponent},
  {path: '**', redirectTo: '/login'} // to redirect all paths unknown
];
