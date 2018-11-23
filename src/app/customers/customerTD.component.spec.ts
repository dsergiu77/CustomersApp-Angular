import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTDComponent } from './customerTD.component';

describe('CustomerTDComponent', () => {
  let component: CustomerTDComponent;
  let fixture: ComponentFixture<CustomerTDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
