import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, TermService, AssignmentService } from '../_services';
import { MustMatch } from '../_helpers/must-match.validator';
import {Assignment} from '../_models/assignment'

@Component({templateUrl: 'assignment.component.html'})
export class AssignmentComponent implements OnInit {
    assignmentForm: FormGroup;
    loading = false;
    submitted = false;
    assignment:Assignment;

    constructor(
        private router: Router,
        private assignmentService: AssignmentService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private routerIonfo:ActivatedRoute
    ) { }

    ngOnInit() {
        this.assignmentForm = this.formBuilder.group({
            question: ['', Validators.required],
            answer: ['', Validators.required],
            post_date: ['', Validators.required],
            due_date: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.assignmentForm.controls; }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.assignmentForm.invalid) {
            return;
        }

        this.loading = true;
        this.assignmentService.addAssignment(this.assignmentForm.value,this.routerIonfo.snapshot.queryParams["cid"])
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Add an assignment successful', true);
                    this.router.navigate(['/ihome']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
  }