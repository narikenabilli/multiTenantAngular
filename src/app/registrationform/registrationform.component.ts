import { Router } from '@angular/router';
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

  constructor(private commonService: CommonService, private router: Router) {
    const currNav = this.router.getCurrentNavigation();
    if(currNav.extras.state && currNav.extras.state.tenant){
      this.tenant = currNav.extras.state.tenant;
    }
   }

  ngOnInit() {
    const regFormData = this.commonService.getFormData();
    if(regFormData){
      this.dynamicFormArray = regFormData["registrationForm"];
    }
  }

}
