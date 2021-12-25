import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgMagneticModule } from 'ng-magnetic';
import { NgCursorModule } from 'projects/ng-magnetic/src/public-api';

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
