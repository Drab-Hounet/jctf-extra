import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password-entry-point',
  imports: [],
  standalone: true,
  templateUrl: './forgot-password-entry-point.component.html',
  styleUrl: './forgot-password-entry-point.component.scss'
})
export class ForgotPasswordEntryPointComponent implements OnInit{

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.router.navigate(['reset'], { relativeTo: this.route, queryParams: { token } });
      } else {
        this.router.navigate(['request'], { relativeTo: this.route });
      }
    });
  }
}
