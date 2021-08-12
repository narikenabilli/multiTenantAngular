import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  formData: any;
  clientData: any;

  constructor() { }

  setFormData(formData){
    this.formData = formData;
  }
  getFormData(){
    return this.formData;
  }

  setClientConfig(clientData){
    this.clientData = clientData;
  }
  getClientConfig(){
    return this.clientData;
  }
}
