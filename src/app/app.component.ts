import { Router } from '@angular/router';
import { CommonService } from './services/utility/common.service';
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, HostBinding } from "@angular/core";
import { forkJoin } from "rxjs";
import { Tenant, TenantService } from './tenant/tenant.service';
import { TranslateService } from '@ngx-translate/core';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app.component.skins.less']
})
export class AppComponent implements OnInit {

  title = 'multi-tenant-angular';
  clientConfiguration: any;
  setTenantData: any;

  dynamicFormArray: any;
  tenantName: any;
  loadComponent: boolean;
  displayLogo: any;
  navBackGround: any;
  layoutStyle: any;
  showMenu: boolean;

  // faUser = faUser;

  constructor(private tenantService: TenantService, private httpClient: HttpClient, protected commonService: CommonService, private router: Router, private translate: TranslateService,
    // private library: FaIconLibrary
  ) {
    // library.addIcons(faUser);
  }

  //applying the theme using Angular host binding
  @HostBinding("class.theme-client1") public client1Theme: boolean;
  @HostBinding("class.theme-client2") public client2Theme: boolean;

  ngOnInit() {

    // for language
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');


    const observableArray = [];

    // call set the tenant
    observableArray.push(this.httpClient.get('/assets/ClientConfiguration.json'));

    // call to generate the dynamic form
    observableArray.push(this.httpClient.get('/assets/DynamicFormControl.json'));

    // call to get the validations from DB
    observableArray.push(this.httpClient.get('/assets/formFieldValidations.json'));

    forkJoin(observableArray).subscribe((res: any) => {
      if (res && res[0]) {
        this.commonService.setClientConfig(res[0]);
        Object.keys(res[0]).forEach( clientName => {
          if(clientName == this.tenant){
            this.displayLogo = res[0][clientName].logo;
            this.navBackGround = res[0][clientName].navBar;
            this.layoutStyle = res[0][clientName].layoutStyle;
          }
        });
      }
      if (res && res[1]) {
        this.commonService.setFormData(res[1]);
      }
      if (res && res[2]) {
        this.commonService.setValidationData(res[2]);
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
    // console.log(event, "event");
    this.router.navigate([event], { state: { tenant: this.tenant } })
  }

  changeLang(event: any){
     this.translate.use(event.target.value)
  }

  menuClose() {
    this.showMenu = !this.showMenu;
  }
}
