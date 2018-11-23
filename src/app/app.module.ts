import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerReactiveComponent } from './customers/customerReactive.component';
import { ControlMessagesComponent } from './customers/controlmessages.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlMessagesComponent,
    CustomerReactiveComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
