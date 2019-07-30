import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';
import { User } from '../_models';

@Component({templateUrl: 'user-detail.component.html'})
export class UserDetailComponent implements OnInit {
    editForm: FormGroup;
    loading = false;
    submitted = false;
    user: User;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private routerIonfo:ActivatedRoute
    ) {}

    ngOnInit() {
        this.editForm = this.formBuilder.group({
            name: ['name', Validators.required],
            type: ['type',Validators.required],
            enabled: ['enabled', [Validators.required]]
        });
        this.getUserDetail();
    }

    // convenience getter for easy access to form fields
    get f() { return this.editForm.controls; }

    getUserDetail() {
      this.userService.getByCin(this.routerIonfo.snapshot.queryParams["cin"]).pipe(first()).subscribe(user => { 
        this.user = user; 
      });
    }

    onSubmit() {
        this.submitted = true;

        //stop here if form is invalid
        if (this.editForm.invalid) {
            return;
        }

        console.log(this.editForm.value)
        this.loading = true;
        this.userService.update(this.editForm.value,this.user.id)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Edit successfully', true);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
  }