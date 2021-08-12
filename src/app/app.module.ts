import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { CommonFormComponent } from './components/common-form/common-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationformComponent,
    CommonFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
