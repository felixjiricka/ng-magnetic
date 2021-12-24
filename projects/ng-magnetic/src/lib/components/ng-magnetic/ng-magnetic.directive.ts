import { AfterViewInit, Directive, ElementRef, TemplateRef } from '@angular/core';
import { MagneticCtrl } from '../../controller/magnetic-ctrl';

@Directive({
    selector: '[ngMagnetic]',
})
export class NgMagneticDirective implements AfterViewInit{
    _magnetic: MagneticCtrl;

    constructor(private _el: ElementRef) {
        console.log('con');
    }

    ngAfterViewInit(): void {
        this._magnetic = new MagneticCtrl(this._el);
        console.log('hey', this._magnetic);
    }
}
