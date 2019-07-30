import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../_services/assignment.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {
  assignmentGrade;

  constructor(
    private assignmentService: AssignmentService
  ) { }

  ngOnInit() {
    console.log('In grade component');
    this.getAssignmentGrade();
  }

  private getAssignmentGrade() {
    this.assignmentService.getAllUserAssignmentWithGrade().pipe(first()).subscribe(assignments => {
      console.log('....', assignments);
      this.assignmentGrade = assignments;
   });
  }

}
