import { Injectable } from '@angular/core';
import { StudentDetailsInterface } from '../interface/student-details-interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentListService {
  // Global Variable
  setStudentGrade: string = '';
  indexNumber!: number;
  totalStudent = new Subject<number>();
  studentDetailsList: StudentDetailsInterface[] = [];
  editSelectedData!: StudentDetailsInterface;
  studentFilterDetailsList = new Subject<any>();
  searchData: string = "";
  gradeData: string = "";

  // submit Data 
  submitStudentData = (studentData: StudentDetailsInterface) => {
    let min = 100000000000;
    let max = 999999999999;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    this.setStudentResultGrade(studentData);
    this.studentDetailsList.push({
      ...studentData,
      enrollmentId: randomNumber,
      grade: this.setStudentGrade,
      noOfSububject: studentData.subject.length
    });
    this.studentFilterDetailsList.next(this.studentDetailsList);
    this.totalStudent.next(this.studentDetailsList.length);
  };


  // set Student result Grade 
  setStudentResultGrade = (subjectMarksData: StudentDetailsInterface) => {
    let selectedsubject = subjectMarksData.subject.length;
    const sum = subjectMarksData.subject.reduce((accumulator: StudentDetailsInterface, object: StudentDetailsInterface | any) => {
      return accumulator + object.sMarks;
    }, 0);

    let allSubjectAverageTotal: number = sum / selectedsubject;

    switch (true) {
      case allSubjectAverageTotal >= 80:
        this.setStudentGrade = 'A';
        break;
      case allSubjectAverageTotal >= 70:
        this.setStudentGrade = 'B';
        break;
      case allSubjectAverageTotal >= 60:
        this.setStudentGrade = 'C';
        break;
      case allSubjectAverageTotal >= 50:
        this.setStudentGrade = 'D';
        break;
      case allSubjectAverageTotal >= 33:
        this.setStudentGrade = 'E';
        break;
      default:
        this.setStudentGrade = 'F';
    };
  };

  // delete student details 
  onDeleteStudentListItem = (id: any) => {
    let setDeleteItemIndex = this.studentDetailsList.findIndex(object => {
      return object.enrollmentId === id;
    });
    this.studentDetailsList.splice(setDeleteItemIndex, 1);
    this.studentFilterDetailsList.next(this.studentDetailsList);
    this.totalStudent.next(this.studentDetailsList.length);
    this.filterStudentListData();
  };

  // edit student Details 
  onEditStudentDetails = (id: number) => {
    this.indexNumber = this.studentDetailsList.findIndex(object => {
      return object.enrollmentId === id;
    });
    this.editSelectedData = this.studentDetailsList[this.indexNumber];

  };

  // update Student Details 
  updateOnStudentDetails = (studentData: StudentDetailsInterface) => {
    this.setStudentResultGrade(studentData);
    let setnewData = {
      ...studentData,
      enrollmentId: this.studentDetailsList[this.indexNumber].enrollmentId,
      grade: this.setStudentGrade,
      noOfSububject: studentData.subject.length,
    };
    this.studentDetailsList[this.indexNumber] = setnewData;
  };

  // set search value 
  searchFilterData = (searchText: string) => {
    this.searchData = searchText
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
    let selectedData = this.studentDetailsList.filter((data: any) => {
      let nameFound = data.name.toString().trim().toLowerCase().search(fields.name.toLowerCase()) !== -1;
      let emailFound = data.email.toString().trim().search(fields.name) !== -1;
      let enrollmentIdFound = data.enrollmentId.toString().trim().search(fields.name) !== -1;
      let phoneNumberFound = data.phoneNumber.toString().trim().search(fields.name) !== -1;
      let gradeFound = data.grade.search(fields.selected) !== -1;
      return fields.name.indexOf('') && fields.selected === '' ? nameFound || emailFound || enrollmentIdFound || phoneNumberFound || gradeFound : (nameFound || emailFound || enrollmentIdFound || phoneNumberFound) && gradeFound
    })
    this.studentFilterDetailsList.next(selectedData);
  };
  // reset search input and selected grade 
  resetFilterFields = () => {
    this.searchData = '';
    this.gradeData = '';
  }

};
