import { ValidationServiceService } from './../../services/utility/validation-service.service';
import { CommonService } from './../../services/utility/common.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-common-reactive',
  templateUrl: './common-reactive.component.html',
  styleUrls: ['./common-reactive.component.scss']
})
export class CommonReactiveComponent implements OnInit {

  // mapping the form fields from DB to UI, so they will not be tightly coupled to DB
  formFieldsArray: any = [{
    controlName : "firstname", configName: "fName"
  },
  {
    controlName : "lastname", configName: "lName"
  },
  {
    controlName : "dob", configName: "dob"
  },
  {
    controlName : "phone", configName: "Phone"
  },
  {
    controlName : "gender", configName: "Gender"
  }];
  validationData: any;
  showFirstName: any;
  showLastName: any;
  showGender: any;
  showDOB: any;

  constructor(private fb: FormBuilder, private commonService: CommonService, private validationService: ValidationServiceService) { }
  commonForm: FormGroup;
  submitted = false;

  formCreate(){
    this.commonForm = this.fb.group({
      firstname : new FormControl(''),
      lastname : new FormControl(''),
      dob : new FormControl(''),
      phone : new FormControl(''),
      gender : new FormControl('male')
    })
  }

  get f() {
    return this.commonForm.controls;
  }


  ngOnInit(): void {
    this.formCreate();
    this.setConfigfromDB();
    this.prepareValidation();
  }

  setConfigfromDB() {
    this.validationData = this.commonService.getValidationData();
    this.showFirstName = this.commonService.getFieldVisibility(this.validationData, "fName");
    this.showLastName = this.commonService.getFieldVisibility(this.validationData, "lName");
    this.showGender = this.commonService.getFieldVisibility(this.validationData, "Gender");
    this.showDOB = this.commonService.getFieldVisibility(this.validationData, "dob");
  }

  prepareValidation() {
    this.validationService.addValidator(this.formFieldsArray, this.validationData, this.commonForm);
  }

  getErrorMessages(formControlName){
    const errors = this.commonForm.get(formControlName).errors;
    return this.validationService.setErrorMessages(errors, formControlName, this.formFieldsArray);
  }

  submitForm(){
    this.submitted = true;
    if (this.commonForm.invalid) {
      return;
    }
    console.log(this.commonForm);
    console.log(this.commonForm.errors);
  }

}
