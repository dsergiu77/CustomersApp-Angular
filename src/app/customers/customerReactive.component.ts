import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormArray } from '@angular/forms';
import { Customer } from './customer';
import { debounceTime } from 'rxjs/operators';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customerReactive.component.html',
  styleUrls: ['./customerReactive.component.css']
})
export class CustomerReactiveComponent implements OnInit {
  customerForm: FormGroup;
  emailGroup: FormGroup;
  addresses: FormArray;
  customer = new Customer();
  emailMessage: string;
  states: Array<{id: string, name: string}> = [
    {id: 'AL', name: 'Alabama'},
    {id: 'AK', name: 'Alaska'},
    {id: 'AZ', name: 'Arizona'},
    {id: 'AR', name: 'Arkansas'},
    {id: 'CA', name: 'California'},
    {id: 'CO', name: 'Colorado'}
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.emailGroup =  this.fb.group({
      email: [null, Validators.email],
      confirmEmail: [null, Validators.email]
      },
      {validator: ValidationService.emailMatcher}
    );

    this.addresses = this.fb.array([this.buildAddressGroup()]);

    this.customerForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      sendNotifications: 'email',
      emailGroup: this.emailGroup,
      phone: null,
      rating: [null, ValidationService.ratingRange(1, 20)],
      sendCatalog: true,
      addresses: this.addresses
    });

    this.customerForm.controls.sendNotifications.valueChanges.subscribe(
      value => this.setNotification(value)
    );

    const emailControl: AbstractControl = this.emailGroup.controls.email;
    emailControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      value => this.setMessage(emailControl)
    );

    // run it once at the beginning, next calls will be made via valueChanges observer
    this.setNotification('email');
  }

  private setMessage(c: AbstractControl): void {
    console.log('setMessage');
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => c.errors[key]
      ).join(' ');
    }
  }

  save(): void {
    console.log('Saved: ' + JSON.stringify(this.customerForm));
  }

  populateTestData(): void {
    console.log('populateTestData');
    this.customerForm.patchValue({
      firstName: 'John',
      lastName: 'Hankook',
      sendCatalog: false
    });
  }

  private setNotification(notifyVia: string): void {
    console.log('setNotification');
    const emailControl: AbstractControl = this.emailGroup.controls.email;
    const phoneControl: AbstractControl = this.customerForm.controls.phone;

    if (notifyVia === 'email') {
      emailControl.setValidators([Validators.required, Validators.email]);
      phoneControl.clearValidators();
      emailControl.enable();
      phoneControl.disable();
      this.customerForm.patchValue({
        phone: null
      });
    } else {
      phoneControl.setValidators(Validators.required);
      phoneControl.enable();
      emailControl.disable();
      this.customerForm.patchValue({
        email: null
      });
      emailControl.clearValidators();
    }
    emailControl.updateValueAndValidity();
    phoneControl.updateValueAndValidity();
  }

  private buildAddressGroup(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: null,
      street2: null,
      city: null,
      state: null,
      zip: null
    });
  }

  private addAddress(): void {
    console.log('addAddress:');
    this.addresses.push(this.buildAddressGroup());
  }

  private deleteAddress(idx: number): void {
    console.log('deleteAddress:' + idx);
    this.addresses.removeAt(idx);
  }
}
