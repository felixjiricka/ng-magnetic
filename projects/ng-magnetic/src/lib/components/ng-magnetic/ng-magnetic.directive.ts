import { AfterViewInit, Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { MagneticCtrl, MagneticOptions } from '../../controller/magnetic-ctrl';

@Directive({
    selector: '[ngMagnetic]',
})
export class NgMagneticDirective implements AfterViewInit{
    _magnetic: MagneticCtrl;

    @Input('options') options: MagneticOptions;

    constructor(private _el: ElementRef) {
        console.log('con');
    }

    ngAfterViewInit(): void {
        this._magnetic = new MagneticCtrl(this._el, this.options);
        console.log('hey', this._magnetic);
    }
}
