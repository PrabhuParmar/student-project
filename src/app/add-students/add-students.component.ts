import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentListService } from '../service/student-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent {
  setFormMode!: boolean;
  subjectMarksData: any = new FormArray([]);

  constructor(private studentListService: StudentListService, private router: Router) {
    this.addControl(1);
    this.setFormMode = studentListService.editMode;
    if (studentListService.editMode == true) {
      this.setSubjectDetails(studentListService.editSelectedData.subject.length)
      this.studentFormDetails.patchValue({
        ...studentListService.editSelectedData
      })
    };
    if (studentListService.checkDeleteValueAndEditValue == true) {
      this.onCancelStudentFormDetails();
    };
  };


  // trim validation 
  trimValidation = (control: AbstractControl) => {
    return control.value !== null && control.value.trim() == '' ? { checkNameValue: true } : null;
  };


  // date validation 
  setDOBValidation = (control: AbstractControl) => {
    let selectedDate = new Date(control.value);
    let todayDate = new Date();
    return selectedDate > todayDate ? { setSelectedDate: true } : null;
  };

  // marks limit 
  setMarksLimit = (control: AbstractControl) => {
    return control.value < 0 || control.value > 100 ? { onMarksLimit: true } : null;
  };

  // student Details Form 
  studentFormDetails: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.trimValidation]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,40}$')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
    dob: new FormControl('', [Validators.required, this.setDOBValidation]),
    subject: this.subjectMarksData,
    gender: new FormControl('male', []),
    semester: new FormControl(1, []),
    termsStatus: new FormControl('', [Validators.required]),
    noOfSububject: new FormControl(1)
  });


  // submit student Details 
  onSubmitstudentFormDetails = () => {
    if (this.setFormMode == true) {
      this.router.navigate(['/student-list'])
      this.studentListService.updateOnStudentDetails(this.studentFormDetails.value)
    }
    else {
      this.studentListService.submitStudentData(this.studentFormDetails.value)
    }
    this.onCancelStudentFormDetails();
  };

  // student details form cancel 
  onCancelStudentFormDetails = () => {
    this.studentFormDetails.reset();
    this.studentFormDetails.patchValue({
      gender: 'male',
      semester: 1,
      noOfSububject: 1
    });
    this.setSubjectDetails(this.studentFormDetails.value.noOfSububject);
    this.setFormMode = false;
    this.studentListService.editMode = this.setFormMode
  };

  get subjectMark(): FormArray {
    return this.studentFormDetails.get('subject') as FormArray;
  };

  // selected Subject change 
  onSelectedNumberOfSubject = (item: number | any) => {
    let noOfSubject = item.target.value;
    this.setSubjectDetails(noOfSubject);
  };

  // set subject and marks input 
  setSubjectDetails = (noOfSubject: number) => {
    while (this.subjectMarksData.length > 0) {
      this.subjectMark.controls.pop();
      this.subjectMarksData.removeAt(0);
    };
    while (noOfSubject > 0) {
      this.addControl(noOfSubject);
      noOfSubject--;
    };
  };

  // subject Form Array 
  addControl = (item: number) => {
    this.subjectMarksData.push(new FormGroup({
      sName: new FormControl('', [Validators.required, Validators.pattern('^.*[a-zA-Z]+.*$')]),
      sMarks: new FormControl('', [Validators.required, this.setMarksLimit]),
    }));
  };

  // remove Subject and marks 
  removeSubject = (index: number) => {
    this.subjectMark.removeAt(index);
  };
};
