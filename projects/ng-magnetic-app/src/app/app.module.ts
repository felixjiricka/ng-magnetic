import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgMagneticModule, NgCursorModule } from 'ng-magnetic';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgMagneticModule,
    NgCursorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
