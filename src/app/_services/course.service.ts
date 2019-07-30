import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Term, SchoolCourse } from '../_models';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Course } from '../_models/course';


@Injectable()
export class CourseService {
    apiUrl = 'http://localhost:8080/springrest/api/';
    constructor(private http: HttpClient) { }

    addCourse(course: Course) {
      return this.http.post(this.apiUrl + 'specific_class', course);
    }

    getAllInstructedCourses() {
        return this.http.get<Course[]>(this.apiUrl + 'user/instructed_classes');
    }

    getAllCourses() {
        return this.http.get<Course[]>(this.apiUrl + 'user/classes');
    }

    getCourseById(id: Number) {
        return this.http.get<Course>(this.apiUrl + 'specific_class/' + id);
    }

    addUserToCourse(uid: number, cid: number) {
        return this.http.post(this.apiUrl + 'user/ ' + uid + '/specific_class/ ' + cid, {});
    }

    getAllClasses() {
        return this.http.get<SchoolCourse[]>(this.apiUrl + 'classes');
    }

}
