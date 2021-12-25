import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCursorComponent } from './ng-cursor.component';



@NgModule({
  declarations: [NgCursorComponent],
  imports: [
    CommonModule
  ],
  exports: [NgCursorComponent]
})
export class NgCursorModule { }
