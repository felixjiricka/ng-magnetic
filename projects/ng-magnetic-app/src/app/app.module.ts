import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgMagneticModule } from 'ng-magnetic';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgMagneticModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
