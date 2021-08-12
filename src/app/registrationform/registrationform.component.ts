import { CommonService } from './../services/utility/common.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TenantService } from '../tenant/tenant.service';

@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css']
})
export class RegistrationformComponent implements OnInit {

  dynamicFormArray: any;
  @Input() tenant;
  tenantName: any;

  constructor(private httpClient: HttpClient, private tenantService: TenantService, private commonService: CommonService) { }

  ngOnInit() {
    const regFormData = this.commonService.getFormData();
    this.dynamicFormArray = regFormData["registrationForm"];
  }

}
