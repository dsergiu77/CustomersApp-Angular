import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      const config = {
          'required': 'Required',
          'minLength': 'Please enter minimum characters',
          'maxLength': 'Please enter maximum characters',
          'invalidCreditCard': 'Is invalid credit card number',
          'invalidEmailAddress': 'Invalid email address',
          'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
          'minlength': `Minimum length ${validatorValue.requiredLength}`
      };

      console.log('config[validatorName]:' + config[validatorName]);
      return config[validatorName];
  }
/*
  <span *ngIf="customerForm.get('lastName').errors?.required">
  Please enter your last name.
</span>
<span *ngIf="customerForm.get('lastName').errors?.maxlength">
  The last name must be less than 50 characters.
</span>
*/

  static creditCardValidator(control: AbstractControl) {
      // Visa, MasterCard, American Express, Diners Club, Discover, JCB
      if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
          return null;
      } else {
          return { 'invalidCreditCard': true };
      }
  }

  static emailValidator(control: AbstractControl) {
      // RFC 2822 compliant regex
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
          return null;
      } else {
          return { 'invalidEmailAddress': true };
      }
  }

  static passwordValidator(control: AbstractControl) {
      // {6,100}           - Assert password is between 6 and 100 characters
      // (?=.*[0-9])       - Assert a string has at least one number
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
          return null;
      } else {
          return { 'invalidPassword': true };
      }
  }

  static ratingRange(minValue: number, maxValue: number): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
      console.log('ratingRange: ' + c.value);
      if (c.value !== null && (isNaN(c.value) || c.value < minValue || c.value > maxValue)) {
        console.log('range error');
        return {'ratingRange': true};
      }
      console.log('range OK');
      return null;
    };
  }

  static emailMatcher (c: AbstractControl): {[key: string]: boolean} | null {
    console.log('emailMatcher: ');
    const emailControl: AbstractControl = c.get('email');
    const confirmEmailControl: AbstractControl = c.get('confirmEmail');

    if (emailControl.pristine && confirmEmailControl.pristine) {
      console.log('email controls not yet touched by the user');
      return null;
    }

    if (emailControl.value === confirmEmailControl.value) {
      console.log('match OK');
      return null;
    }
    console.log('match error');
    return {'emailMatch': true};
  }
}
