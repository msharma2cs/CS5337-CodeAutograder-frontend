import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, TermService } from '../_services';

@Component({templateUrl: 'add-term.component.html'})
export class AddTermComponent implements OnInit {
    termForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private router: Router,
        private termService: TermService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.termForm = this.formBuilder.group({
            description: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.termForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.termForm.invalid) {
            return;
        }

        this.loading = true;
        this.termService.addTerm(this.termForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Add term successful', true);
                    this.router.navigate(['/term']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
