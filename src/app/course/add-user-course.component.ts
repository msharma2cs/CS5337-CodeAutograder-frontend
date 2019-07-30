import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router ,ActivatedRoute, Params} from '@angular/router';
import { User } from '../_models';
import { CourseService, UserService, AlertService} from '../_services';
import { Course } from '../_models/course';
import { SchoolCourse } from '../_models/schoolClass';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({templateUrl: 'add-user-course.component.html'})
export class AddUserCourseComponent implements OnInit {
    studentForm: FormGroup;
    loading = false;
    submitted = false;
    currentUser: User;
    course: Course;
    instructors: User[] = [];
    scourses: SchoolCourse[] = [];
    students: User[];

    constructor(
        private courseService: CourseService,
        private userService: UserService,
        private alertService: AlertService,
        private routerIonfo: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.getCurrentUser();
    }

    ngOnInit() {
        this.studentForm = this.formBuilder.group({
            student_id: ['', Validators.required]
        });
        this.getCourseById();
        this.getAllStudents();
    }

    private getCourseById() {
        this.courseService.getCourseById(this.routerIonfo.snapshot.queryParams["id"]).pipe(first()).subscribe(course => { 
            this.course = course; 
        });
    }

    get f() { return this.studentForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.studentForm.invalid) {
            return;
        }

        this.loading = true;
        this.courseService.addUserToCourse(this.f.student_id.value,this.course.id)
        .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Add student to course successful', true);
                    this.router.navigate(['/ihome']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private getCurrentUser() {
        this.userService.getProfile().pipe(first()).subscribe(user => {
            this.currentUser = user;
        });
    }

    private getAllStudents() {
        this.userService.getAllUsers().pipe(first()).subscribe(students => {
            this.students = students;
            this.students = this.students.filter(obj => obj.type === 'REGULER');
        });
    }

}
