import { Component, OnInit } from '@angular/core';
import { LocalTokenService } from '../_services/local.token.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn: Boolean = false;
  loggedInUserType: String = '';
  homePage: String = '';

  constructor(
    private localTokenProvider: LocalTokenService,
    private router: Router
  ) { }

  ngOnInit() {
    if ( this.localTokenProvider.getToken() ) {
      this.isUserLoggedIn = true;
      this.loggedInUserType = this.localTokenProvider.getUserType();
    } else {
      this.isUserLoggedIn = false;
      this.loggedInUserType = '';
    }
  }

  private getHomePage() {
    if ( this.localTokenProvider.getUserType() === 'ADMIN' ) {
      this.router.navigate(['/home']);
    } else if ( this.localTokenProvider.getUserType() === 'INSTRUCTOR' ) {
      this.router.navigate(['/ihome']);
    } else if ( this.localTokenProvider.getUserType() === 'REGULER' ) {
      this.router.navigate(['/shome']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
