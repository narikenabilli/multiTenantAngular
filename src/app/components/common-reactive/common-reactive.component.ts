import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-common-reactive',
  templateUrl: './common-reactive.component.html',
  styleUrls: ['./common-reactive.component.css']
})
export class CommonReactiveComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  commonForm: FormGroup;

  formCreate(){
    this.commonForm = this.fb.group({
      firstname : new FormControl(''),
      lastname : new FormControl(''),
      phone : new FormControl(''),
      gender : new FormControl('male')
    })
  }


  ngOnInit(): void {
    this.formCreate();
  }

  submitForm(){

  }

}
