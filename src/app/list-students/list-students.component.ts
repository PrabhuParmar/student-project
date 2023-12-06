import { Component, OnDestroy } from '@angular/core';
import { StudentListService } from '../service/student-list.service';
import { StudentDetailsInterface } from '../interface/student-details-interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnDestroy {
  studentDataList: StudentDetailsInterface[] = [];
  setDeleteStudentId: number | any;
  sortingStatus!: boolean;
  sortingImageIconSrc = '../../assets/Image/arrows.png';
  selectedSortingKeyName: string = '';
  constructor(private studentListService: StudentListService, private router: Router) {
    this.studentDataList = studentListService.studentDetailsList;
    this.studentListService.studentFilterDetailsList.subscribe(
      (item: StudentDetailsInterface | any) => {
        this.studentDataList = item;
      }
    );
  };
  // set Sorting 
  setSortingStatus = (keyName: string) => {
    this.selectedSortingKeyName = keyName;
    this.sortingStatus = !this.sortingStatus;
    this.sortingStatus == true ? this.sortingImageIconSrc = '../../assets/Image/arrow-down.png' : this.sortingImageIconSrc = '../../assets/Image/go-up.png';
  };


  setSelectedStudentDetailsIndex = (id: any) => {
    this.setDeleteStudentId = id;
  };

  // delete student Item 
  deleteStudentDetails = () => {
    this.studentListService.onDeleteStudentListItem(this.setDeleteStudentId);
  };

  // edit student Details
  editStudentDetails = (id: number | any) => {
    this.studentListService.onEditStudentDetails(id);
    this.router.navigate(['/add-student']);
  };

  // set search Data in service 

  setSearchData = (searchValue: any) => {
    this.studentListService.searchFilterData(searchValue.target.value);

  };

  // set grade data in service 
  gradeFilterData = (selectedGrade: string | any) => {
    this.studentListService.gradeFilterStudentdetails(selectedGrade.target.value);
  };

  ngOnDestroy(): void {
    this.studentListService.resetFilterFields();
  };

};
