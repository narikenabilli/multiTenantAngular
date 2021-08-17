import { FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationServiceService {

  constructor() { }

  getValidationsfromDB(formFields){

  }

  addValidator(formFields, resp, form: FormGroup){
    formFields.forEach(element => {
      if(form.get(element.controlName)){
        form.get(element.controlName).setValidators(Validators.compose(this.getValidatorsPerField(resp, element)));
        form.get(element.controlName).updateValueAndValidity();
      }
    });
  }

  getValidatorsPerField(resp, field){
    const validations = [];
    const fieldValidation = resp[field.configName].validations[0].propertyValidation;
    if(Object.keys(fieldValidation).length){
      Object.keys(fieldValidation).forEach( ValidatorName => {
        if(ValidatorName === 'required'){
          validations.push(Validators.required);
        }
        if(ValidatorName === 'minLength'){
          validations.push(Validators.minLength(fieldValidation[ValidatorName].value));
        }
        if(ValidatorName === 'maxLength'){
          validations.push(Validators.maxLength(fieldValidation[ValidatorName].value));
        }
      });
    }
    //const fieldName = field.configName;
    // validations.push(fieldValidation);
    return validations;
  }
}
