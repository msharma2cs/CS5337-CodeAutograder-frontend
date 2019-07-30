import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, TermService , UserService, CourseService} from '../_services';
import { MustMatch } from '../_helpers/must-match.validator';
import { User, Term } from '../_models';
import { Course } from '../_models/course';

@Component({templateUrl: 'course.component.html'})
export class CourseComponent implements OnInit {
    schoolCourseForm: FormGroup;
    users: User[] = [];
    terms: Term[] = [];
    loading = false;
    submitted = false;
    classes;

    constructor(
        private router: Router,
        private termService: TermService,
        private userService: UserService,
        private courseService: CourseService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.schoolCourseForm = this.formBuilder.group({
            class_no: ['', Validators.required],
            term_id: ['', Validators.required],
            instructor_id: ['', Validators.required],
            start_time: ['', Validators.required],
            end_time: ['', Validators.required],
            room: ['', Validators.required],
            section: ['', Validators.required],
            class_start_date: ['', Validators.required],
            class_end_date: ['', Validators.required]
        });
        this.loadAllUsers();
        this.getAllTerms();
        this.getAllClasses();
    }

    // convenience getter for easy access to form fields
    get f() { return this.schoolCourseForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.schoolCourseForm.invalid) {
            return;
        }
        console.log(this.schoolCourseForm.value);
        this.loading = true;
        this.courseService.addCourse(this.schoolCourseForm.value).pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Add course successful', true);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private getAllTerms() {
        this.termService.getAllTerms().pipe(first()).subscribe(terms => {
            this.terms = terms;
        });
    }

    private loadAllUsers() {
        this.userService.getAllUsers().pipe(first()).subscribe(users => {
            this.users = users;
            this.users = this.users.filter(obj => obj.type === 'INSTRUCTOR');
        });
    }

    private getAllClasses() {
        this.courseService.getAllClasses().pipe(first()).subscribe(classes => {
            this.classes = classes;
        });
    }

}
