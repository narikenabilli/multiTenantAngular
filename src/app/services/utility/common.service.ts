import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  formData: any;
  clientData: any;
  validationData: any;

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

  setValidationData(validationData){
    this.validationData = validationData;
  }
  getValidationData(){
    return this.validationData;
  }

  getFieldVisibility(resp, fieldName){
    if(resp.hasOwnProperty(fieldName)){
      return resp[fieldName].Allow;
    } else {
      return false;
    }
  }

}
