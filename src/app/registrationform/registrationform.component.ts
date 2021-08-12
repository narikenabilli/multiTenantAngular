import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from './../services/utility/common.service';

@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css']
})
export class RegistrationformComponent implements OnInit {

  dynamicFormArray: any;
  @Input() tenant;
  tenantName: any;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    const regFormData = this.commonService.getFormData();
    this.dynamicFormArray = regFormData["registrationForm"];
  }

}
