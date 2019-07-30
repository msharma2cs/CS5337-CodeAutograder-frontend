import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, TermService } from '../_services';
import {Term} from '../_models/term';

@Component({templateUrl: 'edit-term.component.html'})
export class EditTermComponent implements OnInit {
    termForm: FormGroup;
    loading = false;
    submitted = false;
    term: Term;

    constructor(
        private router: Router,
        private termService: TermService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private routerIonfo: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getTermDetail();
        this.termForm = this.formBuilder.group({
            description: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.termForm.controls; }

    getTermDetail() {
        this.termService.getById(this.routerIonfo.snapshot.queryParams['id']).pipe(first()).subscribe(term => { 
          this.term = term;
        });
      }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.termForm.invalid) {
            return;
        }

        this.loading = true;
        this.termService.update(this.termForm.value, this.term.id)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Edit term successful', true);
                    this.router.navigate(['/term']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
