import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LocalTokenService } from '../_services/local.token.service';
import { AlertService, AuthenticationService, UserService} from '../_services';
import { User} from '../_models/user';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    currentUser: User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private localTokenProvider: LocalTokenService
    ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log('... data', data);
                    if ( data.error ) {
                        this.alertService.error('Wrong email/password combination');
                        this.loading = false;
                        this.router.navigate(['/login']);
                    } else {
                        this.userService.getProfile().pipe(first()).subscribe(user => {
                            this.localTokenProvider.saveUserType(user.type);
                            if (user.type === 'ADMIN') {
                                this.router.navigate(['/home']);
                            } else if (user.type === 'INSTRUCTOR') {
                                this.router.navigate(['/ihome']);
                            } else {
                                this.router.navigate(['/shome']);
                            }
                        });
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
