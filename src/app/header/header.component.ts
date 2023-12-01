import { Component, OnInit } from '@angular/core';
import { StudentListService } from '../service/student-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalStudent: number = 0;
  constructor(private studentService: StudentListService) { }
  ngOnInit(): void {
    this.studentService.totalStudent.subscribe(
      (student: number) => {
        this.totalStudent = student;
      }
    );
  };
};
