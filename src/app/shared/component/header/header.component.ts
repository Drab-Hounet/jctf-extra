import {Component, Input} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() iPseudo = '';

  constructor(private router: Router) {
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout(): void {
    localStorage.removeItem('currentJCTF');
    this.navigateTo('login');
  }

}
