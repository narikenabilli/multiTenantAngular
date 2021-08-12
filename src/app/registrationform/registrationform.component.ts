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

  constructor(private httpClient: HttpClient, private tenantService: TenantService) { }

  ngOnInit() {
    this.httpClient.get('/assets/DynamicFormControl.json').subscribe(data => {
      this.dynamicFormArray = data;
      this.tenantName = this.tenant;
      console.log(this.tenantName);
    });
  }

}
