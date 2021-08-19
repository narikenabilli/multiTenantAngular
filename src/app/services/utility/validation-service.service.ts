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
          field.required = fieldValidation[ValidatorName].message
          validations.push(Validators.required);
        }
        if(ValidatorName === 'minLength'){
          field.minLength = fieldValidation[ValidatorName].message
          validations.push(Validators.minLength(fieldValidation[ValidatorName].value));
        }
        if(ValidatorName === 'maxLength'){
          field.maxLength = fieldValidation[ValidatorName].message
          validations.push(Validators.maxLength(fieldValidation[ValidatorName].value));
        }
      });
    }
    //const fieldName = field.configName;
    // validations.push(fieldValidation);
    return validations;
  }

  setErrorMessages(errors, formControlName, fieldsArray){
    const field = fieldsArray.find( x => x.controlName === formControlName);
    if(field){
    if(errors.required){ //reactive form error validation "required", not our property"
      return field.required ? field.required : '';
    }
    if(errors.minlength){ //reactive form error validation "minlength", not our property minLength"
      return field.minLength ? field.minLength : '';
    }
    if(errors.maxlength){
      return field.maxLength ? field.maxLength : '';
    }
    }
  }
}
