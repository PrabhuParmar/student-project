import { Injectable } from '@angular/core';
import { StudentDetailsInterface } from '../interface/student-details-interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentListService {

  // Global Variable
  studentGrade: string = '';
  editMode: boolean = false;
  indexNumber!: number;
  totalStudent = new Subject<number>();
  studentDetailsList: StudentDetailsInterface[] = [];
  editSelectedData!: StudentDetailsInterface;
  studentFilterDetailsList = new Subject<any>();
  searchData: string = "";
  gradeData: string = "";
  checkDeleteValueAndEditValue!: boolean;

  // submit Data 
  submitStudentData = (studentData: StudentDetailsInterface) => {
    let min = 100000000000;
    let max = 999999999999;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    this.setStudentResultGrade(studentData);
    this.studentDetailsList.push({
      ...studentData,
      enrollmentId: randomNumber,
      grade: this.studentGrade,
      noOfSububject: studentData.subject.length

    });
    this.totalStudent.next(this.studentDetailsList.length);
  };


  // set Student result Grade 
  setStudentResultGrade = (subjectMarksData: StudentDetailsInterface) => {
    let selectedsubject = subjectMarksData.subject.length;
    const sum = subjectMarksData.subject.reduce((accumulator: StudentDetailsInterface, object: StudentDetailsInterface | any) => {
      return accumulator + object.sMarks;
    }, 0);

    let allSubjectAverageTotal: number = sum / selectedsubject;

    if (allSubjectAverageTotal >= 80) {
      this.studentGrade = 'A';
    }
    else if (allSubjectAverageTotal >= 70) {
      this.studentGrade = 'B';
    }
    else if (allSubjectAverageTotal >= 60) {
      this.studentGrade = 'C';
    }
    else if (allSubjectAverageTotal >= 50) {
      this.studentGrade = 'D';
    }
    else if (allSubjectAverageTotal >= 33) {
      this.studentGrade = 'E';
    }
    else {
      this.studentGrade = 'F';
    };
  };

  // delete student details 
  onDeleteStudentListItem = (index: number, id: any) => {
    if (this.editSelectedData !== undefined && this.editSelectedData.enrollmentId === id) {
      this.checkDeleteValueAndEditValue = true;
    };
    const setFilterValue = this.studentDetailsList.filter(object => {
      return object.enrollmentId !== id;
    });
    this.studentDetailsList = setFilterValue
    this.studentFilterDetailsList.next(this.studentDetailsList)
    this.totalStudent.next(this.studentDetailsList.length);
    this.filterStudentListData();
  };

  // edit student Details 
  onEditStudentDetails = (index: number) => {
    this.checkDeleteValueAndEditValue = false;
    this.indexNumber = index;
    this.editMode = true;
    this.editSelectedData = this.studentDetailsList[index];
  };

  // update Student Details 
  updateOnStudentDetails = (studentData: StudentDetailsInterface) => {
    this.setStudentResultGrade(studentData);
    let setnewData = {
      ...studentData,
      enrollmentId: this.studentDetailsList[this.indexNumber].enrollmentId,
      grade: this.studentGrade,
      noOfSububject: studentData.subject.length,
    };
    this.studentDetailsList[this.indexNumber] = setnewData;
  };

  // set search value 
  searchFilterData = (searchText: string) => {
    this.searchData = searchText;
    this.filterStudentListData();
  };

  // set grade Data Value 
  gradeFilterStudentdetails = (gradeText: string) => {
    this.gradeData = gradeText;
    this.filterStudentListData();
  };

  // filter student List data 
  filterStudentListData = () => {
    let fields = {
      name: this.searchData,
      selected: this.gradeData
    };
    this.studentFilterDetailsList.next(
      this.studentDetailsList.filter((data: any) => {
        let nameFound = data.name.toString().trim().toLowerCase().search(fields.name.toLowerCase()) !== -1;
        let emailFound = data.email.toString().trim().search(fields.name) !== -1;
        let enrollmentIdFound = data.enrollmentId.toString().trim().search(fields.name) !== -1;
        let phoneNumberFound = data.phoneNumber.toString().trim().search(fields.name) !== -1;
        let gradeFound = data.grade.search(fields.selected) !== -1;
        return fields.name.indexOf('') && fields.selected === '' ? nameFound || emailFound || enrollmentIdFound || phoneNumberFound || gradeFound : (nameFound || emailFound || enrollmentIdFound || phoneNumberFound) && gradeFound
      })
    );

  };

};
