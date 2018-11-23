
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-control-messages',
  // template: `<span class="invalid-feedback" *ngIf="errorMessage">{{errorMessage}}</span>`
  template: `<div *ngIf="errorMessage">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    console.log('getErrorMessage:');
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || this.control.dirty)) {
        console.log('getValidatorErrorMessage: ' + this.control.errors[propertyName]);
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    console.log('return null');
    return null;
  }
}


