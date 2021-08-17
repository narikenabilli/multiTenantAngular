import { Router } from '@angular/router';
import { CommonService } from './services/utility/common.service';
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, HostBinding } from "@angular/core";
import { forkJoin } from "rxjs";
import { Tenant, TenantService } from './tenant/tenant.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.skins.less']
})
export class AppComponent implements OnInit {

  title = 'multi-tenant-angular';
  clientConfiguration: any;
  setTenantData: any;

  dynamicFormArray: any;
  tenantName: any;
  loadComponent: boolean;

  constructor(private tenantService: TenantService, private httpClient: HttpClient, protected commonService: CommonService, private router: Router){
  }

  @HostBinding("class.theme-client1") public client1Theme: boolean;
  @HostBinding("class.theme-client2") public client2Theme: boolean;

  ngOnInit() {

    const observableArray = [];

    observableArray.push(this.httpClient.get('/assets/ClientConfiguration.json'));
    observableArray.push(this.httpClient.get('/assets/DynamicFormControl.json'));
    
    forkJoin(observableArray).subscribe((res: any) => {
      if (res && res[0]) {
        this.commonService.setClientConfig(res[0]);
      }
      if (res && res[1]) {
        this.commonService.setFormData(res[1]);
      }
      this.loadComponent = true;
    });

    this.enableThemes();
  }



  get tenant() : string {
    return this.tenantService.getTenant();
  }

  enableThemes() {
    this.client1Theme = this.tenantService.getTenant() === Tenant.CLIENT1;
    this.client2Theme = this.tenantService.getTenant() === Tenant.CLIENT2;
  }

  navigation(event){
    console.log(event, "event");
    this.router.navigate([event], { state: { tenant: this.tenant } })
  }
}
