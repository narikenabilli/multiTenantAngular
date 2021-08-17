import { ValidationServiceService } from './../../services/utility/validation-service.service';
import { CommonService } from './../../services/utility/common.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-common-reactive',
  templateUrl: './common-reactive.component.html',
  styleUrls: ['./common-reactive.component.css']
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
    controlName : "phone", configName: "Phone"
  },
  {
    controlName : "gender", configName: "Gender"
  }];
  validationData: any;

  constructor(private fb: FormBuilder, private commonService: CommonService, private validationService: ValidationServiceService) { }
  commonForm: FormGroup;
  submitted = false;

  formCreate(){
    this.commonForm = this.fb.group({
      // firstname : [''],
      // lastname : [''],
      // phone : [''],
      // gender : ['']
      firstname : new FormControl(''),
      lastname : new FormControl(''),
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
  }

  prepareValidation() {
    this.validationService.addValidator(this.formFieldsArray, this.validationData, this.commonForm);

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
