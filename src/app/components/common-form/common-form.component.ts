import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-form',
  templateUrl: './common-form.component.html',
  styleUrls: ['./common-form.component.css']
})
export class CommonFormComponent implements OnInit {

  @Input() dynamicFormArray;
  @Input() tenant;
  constructor() { }

  ngOnInit(): void {
    console.log(this.dynamicFormArray, "dynamic form");
  }

}
