import { Component } from '@angular/core';
import { StudentListService } from '../service/student-list.service';
import { StudentDetailsInterface } from '../interface/student-details-interface';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent {
  // Global Variables
  studentDataList: StudentDetailsInterface[] = [];
  idSortingStatus!: boolean;
  phoneNumberSortingStatus!: boolean;
  nameSortingStatus!: boolean;
  emailSortingStatus!: boolean;
  dateSortingStatus!: boolean;
  setDeletestudentIndex!: number;
  setDeleteStudentId: number | any;
  sortingvalue = '../../assets/Image/arrows.png';
  phoneNumberSortingIcon = '../../assets/Image/arrows.png';
  nameSortingStatusIcon = '../../assets/Image/arrows.png';
  emailSortingStatusIcon = '../../assets/Image/arrows.png';
  dateSortingIcon = '../../assets/Image/arrows.png';

  constructor(private studentListService: StudentListService, private router: Router) {
    this.studentDataList = studentListService.studentDetailsList;
    studentListService.studentFilterDetailsList.subscribe(
      (item: StudentDetailsInterface | any) => {
        this.studentDataList = item;
      }
    );
  };
  // sorting Id
  sortingId = () => {
    this.idSortingStatus = !this.idSortingStatus
    this.idSortingStatus == true ? this.sortingvalue = '../../assets/Image/arrow-down.png' : this.sortingvalue = '../../assets/Image/go-up.png';
    this.idSortingStatus == true ? this.studentDataList.sort((next: StudentDetailsInterface | any, prev: StudentDetailsInterface | any) =>
      (next.enrollmentId > prev.enrollmentId) ? 1 : -1) : this.studentDataList.sort((next: StudentDetailsInterface | any, prev: StudentDetailsInterface | any) =>
        (next.enrollmentId < prev.enrollmentId) ? 1 : -1);

    this.studentListService.studentFilterDetailsList.next(this.studentDataList)
  };

  // Phone number
  sortingPhoneNumber = () => {
    this.phoneNumberSortingStatus = !this.phoneNumberSortingStatus
    this.phoneNumberSortingStatus == true ? this.phoneNumberSortingIcon = '../../assets/Image/arrow-down.png' : this.phoneNumberSortingIcon = '../../assets/Image/go-up.png';
    this.phoneNumberSortingStatus == true ? this.studentDataList.sort((next: StudentDetailsInterface, prev: StudentDetailsInterface) =>
      (next.phoneNumber > prev.phoneNumber) ? 1 : -1) : this.studentDataList.sort((next: StudentDetailsInterface, prev: StudentDetailsInterface) =>
        (next.phoneNumber < prev.phoneNumber) ? 1 : -1);
    this.studentListService.studentFilterDetailsList.next(this.studentDataList)
  };

  // name Sorting 
  sortingName = () => {
    this.nameSortingStatus = !this.nameSortingStatus
    this.nameSortingStatus == true ? this.nameSortingStatusIcon = '../../assets/Image/arrow-down.png' : this.nameSortingStatusIcon = '../../assets/Image/go-up.png';
    this.nameSortingStatus ? this.studentDataList.sort((next, prev) =>
      (next.name.toUpperCase() > prev.name.toUpperCase()) ? 1 : -1) : this.studentDataList.sort((next: StudentDetailsInterface, prev: StudentDetailsInterface) =>
        (next.name.toUpperCase() < prev.name.toUpperCase()) ? 1 : -1);
    this.studentListService.studentFilterDetailsList.next(this.studentDataList)
  };

  // email sorting 
  sortingEmail = () => {
    this.emailSortingStatus = !this.emailSortingStatus
    this.emailSortingStatus == true ? this.emailSortingStatusIcon = '../../assets/Image/arrow-down.png' : this.emailSortingStatusIcon = '../../assets/Image/go-up.png';
    this.emailSortingStatus ? this.studentDataList.sort((next, prev) =>
      (next.email > prev.email) ? 1 : -1) : this.studentDataList.sort((next: StudentDetailsInterface, prev: StudentDetailsInterface) =>
        (next.email < prev.email) ? 1 : -1);
    this.studentListService.studentFilterDetailsList.next(this.studentDataList)
  };

  // date Sorting 
  sortingDate = () => {
    this.dateSortingStatus = !this.dateSortingStatus
    this.dateSortingStatus == true ? this.dateSortingIcon = '../../assets/Image/arrow-down.png' : this.dateSortingIcon = '../../assets/Image/go-up.png';
    this.dateSortingStatus == true ? this.studentDataList.sort((next: StudentDetailsInterface, prev: StudentDetailsInterface) =>
      (next.dob > prev.dob) ? 1 : -1) : this.studentDataList.sort((next: StudentDetailsInterface, prev: StudentDetailsInterface) =>
        (next.dob < prev.dob) ? 1 : -1);
    this.studentListService.studentFilterDetailsList.next(this.studentDataList)
  };

  setSelectedStudentDetailsIndex = (index: number, id: any) => {
    this.setDeletestudentIndex = index;
    this.setDeleteStudentId = id;
  };
  // delete student Item 
  deleteStudentDetails = () => {
    this.studentListService.onDeleteStudentListItem(this.setDeletestudentIndex, this.setDeleteStudentId);
  };

  // edit student Details
  editStudentDetails = (index: number) => {
    this.studentListService.onEditStudentDetails(index);
    this.router.navigate(['/add-student']);
  };

  // set search Data in service 
  setSearchData = (searchValue: any) => {
    this.studentListService.searchFilterData(searchValue.target.value);
    // searchValue.target.value = ''
  };

  // set grade data in service 
  gradeFilterData = (selectedGrade: string | any) => {
    this.studentListService.gradeFilterStudentdetails(selectedGrade.target.value);
  };
};
