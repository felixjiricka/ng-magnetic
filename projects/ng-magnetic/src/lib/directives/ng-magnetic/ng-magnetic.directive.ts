import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
} from '@angular/core';
import { gsap } from 'gsap';

export class MagneticOptions {
    hDelta: number;
    vDelta: number;
    speed: number;
    releaseSpeed: number;
    scroller: string;
}

@Directive({
    selector: '[ngMagnetic]',
})
export class NgMagneticDirective implements AfterViewInit {
    #x;
    #y;
    #width;
    #height;
    #scroller: HTMLElement;

    onEnter: EventEmitter<any> = new EventEmitter<any>();
    onLeave: EventEmitter<any> = new EventEmitter<any>();

    #defaultOptions: MagneticOptions = {
        hDelta: 0.2, // horizontal delta
        vDelta: 0.2, // vertical delta
        speed: 0.2, // speed
        releaseSpeed: 0.7, // release speed
        scroller: 'body',
    };

    _options: MagneticOptions = this.#defaultOptions;

    @Input('options')
    set options(data) {
        this._options = { ...this.#defaultOptions, ...data };
        this.#y = 0;
        this.#x = 0;
        this.#width = 0;
        this.#height = 0;
    }

    constructor(private _el: ElementRef) {}

    ngAfterViewInit(): void {
        this._bind();
    }

    private _bind() {
        this.#scroller = document.querySelector(
            this._options.scroller
        ) as HTMLElement;

        this._el['nativeElement'].addEventListener('mouseenter', () => {
            const isFixed = this.isFixed(this._el.nativeElement);

            var scrollerLeft = this.#scroller.scrollLeft;
            var scrollerTop = this.#scroller.scrollTop;

            this.#width = this._el['nativeElement'].offsetWidth;
            this.#height = this._el['nativeElement'].offsetHeight;

            if(isFixed) {
                this.#y = isFixed.y + this._el['nativeElement'].offsetTop;
                this.#x = isFixed.x + this._el['nativeElement'].offsetLeft;
            } else {
                this.#y = this._el['nativeElement'].offsetTop - scrollerTop;
                this.#x = this._el['nativeElement'].offsetLeft - scrollerLeft;
            }

            this.onEnter.emit('enter');
        });

        this._el['nativeElement'].addEventListener('mousemove', (e) => {
            const y =
                (e.clientY - this.#y - this.#height / 2) * this._options.vDelta;
            const x =
                (e.clientX - this.#x - this.#width / 2) * this._options.hDelta;

            this._move(x, y, this._options.speed);
        });

        this._el['nativeElement'].addEventListener('mouseleave', (e) => {
            this._move(0, 0, this._options.releaseSpeed);

            this.onLeave.emit('leave');
        });
    }

    private _move(x, y, speed) {
        gsap.to(this._el['nativeElement'], {
            y: y,
            x: x,
            force3D: true,
            overwrite: true,
            duration: speed,
        });
    }

    isFixed(elm) {
        var el;
        if (typeof elm === 'object') el = elm[0] || elm;
        else if (typeof elm === 'string') el = document.querySelector(elm);
        while (typeof el === 'object' && el.nodeName.toLowerCase() !== 'body') {
            let style = window.getComputedStyle(el);
            if (style.getPropertyValue('position').toLowerCase() === 'fixed') {
                let x = this.convertPxToNumber(style.getPropertyValue('left'));
                let y = this.convertPxToNumber(style.getPropertyValue('top'));

                return {
                    x: x,
                    y: y
                };
            }
            el = el.parentElement;
        }
        return null;
    }

    convertPxToNumber(val: string) {
        return parseFloat(val.toLowerCase().replace('px', ''));
    }
}
