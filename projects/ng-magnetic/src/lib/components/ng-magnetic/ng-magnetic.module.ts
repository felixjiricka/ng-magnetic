import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMagneticDirective } from './ng-magnetic.directive';


@NgModule({
  declarations: [NgMagneticDirective],
  imports: [
    CommonModule
  ],
  exports: [NgMagneticDirective]
})
export class NgMagneticModule { }
