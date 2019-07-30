import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Term, Assignment } from '../_models';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Course } from '../_models/course';


@Injectable()
export class AssignmentService {
    apiUrl = "http://localhost:8080/springrest/api/";
    constructor(private http: HttpClient) { }

    addCourse(course:Course) {
      return this.http.post(this.apiUrl+'specific_class',course);
    }
    getAllInstructedCourses(){
        return this.http.get<Course[]>(this.apiUrl+'user/instructed_classes');
    }

    getCourseById(id:Number) {
        return this.http.get<Course>(this.apiUrl+'specific_class/'+id);
    }

    getAllAssignments(id:Number) {
        console.log(id)
        return this.http.get<Assignment[]>(this.apiUrl + "specific_class/"+id+"/assignments");
    }

    addAssignment(assignment:Assignment,cid:number) {
        assignment.specific_class_id = cid;
        return this.http.post(this.apiUrl+"assignment",assignment);
    }

    submitAssignment(assignment: Assignment, aid: number) {
        return this.http.post(this.apiUrl + 'user_assignment/' + aid, assignment);
    }

    getAssignmentWithGrade(aid: number) {
        console.log(aid);
        return this.http.get(this.apiUrl + 'user_assignment/' + aid);
    }

    getAllUserAssignmentWithGrade() {
        return this.http.get(this.apiUrl + '/user/assignments');
    }

}
