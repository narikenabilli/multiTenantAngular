import { HttpClient } from "@angular/common/http";
import { Component, OnInit, HostBinding } from "@angular/core";
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

  constructor(private tenantService: TenantService, private httpClient: HttpClient){
  }

  @HostBinding("class.theme-client1") public client1Theme: boolean;
  @HostBinding("class.theme-client2") public client2Theme: boolean;

  ngOnInit() {

    this.httpClient.get('/assets/ClientConfiguration.json').subscribe((data: any) => {
      this.clientConfiguration = data;
      this.setTenantData = this.clientConfiguration[this.tenantService.getTenant()];
      console.log(this.clientConfiguration);
    });

    console.log(this.setTenantData, "TenantData");

    this.enableThemes();
  }

  get tenant() : string {
    return this.tenantService.getTenant();
  }

  enableThemes() {
    this.client1Theme = this.tenantService.getTenant() === Tenant.CLIENT1;
    this.client2Theme = this.tenantService.getTenant() === Tenant.CLIENT2;
  }
}
