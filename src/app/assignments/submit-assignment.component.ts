import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Assignment } from '../_models';
import { UserService, AssignmentService, AlertService} from '../_services';
import { Course } from '../_models/course';
import { SchoolCourse } from '../_models/schoolClass';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({templateUrl: 'submit-assignment.component.html'})
export class SubmitAssignmentComponent implements OnInit {
    currentUser: User;
    assignments:Assignment[] = [];
    instructors:User[] = [];
    scourses: SchoolCourse[] = [];
    assignmentForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private assignmentService: AssignmentService,
        private userService: UserService,
        private routerIonfo: ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.assignmentForm = this.formBuilder.group({
            language: ['', Validators.required],
            script: ['', Validators.required]
        });
        this.getAssignments();
    }

    private getAssignments() {
        this.assignmentService.getAllAssignments(this.routerIonfo.snapshot.queryParams['id']).pipe(first()).subscribe(assignments => { 
           this.assignments = assignments;
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

        this.assignmentService.submitAssignment( this.assignmentForm.value, this.routerIonfo.snapshot.queryParams['id'])
        .pipe().subscribe(assignment => {
            console.log('./././', assignment);
            this.router.navigate(['/grade']);
        });
    }

}
