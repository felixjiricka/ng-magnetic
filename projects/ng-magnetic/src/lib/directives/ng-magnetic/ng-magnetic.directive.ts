import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
} from '@angular/core';
import { gsap } from 'gsap';
import { MagneticOptions } from '../../models/MagneticOptions';
import { Utils } from '../../utils/utils';

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
        // currently not needed
        scroller: {
            selector: 'body',
            scrollType: 'normal',
        },
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
        if (typeof Element.prototype.getBoundingClientRect !== 'function') {
            console.info('Can not initialize ngMagnetic because getBoundingClientRect() is not supported in your browser.');
            return false;
        }

        this.#scroller = document.querySelector(
            this._options.scroller.selector
        ) as HTMLElement;

        this._el['nativeElement'].addEventListener('mouseenter', () => {
            /*
            let scrollerLeft, scrollerTop;
            const isFixed = this._isFixed(this._el.nativeElement);

            // get scroll offset & handle coordinates
            if (this._options.scroller.scrollType == 'transform') {
                let transform = Utils.getScrollTransform(this._options.scroller.selector);

                scrollerLeft = transform.left;
                scrollerTop = transform.top;

                this.#y = this._el['nativeElement'].offsetTop - (isFixed ? 0 : scrollerTop);
                this.#x = this._el['nativeElement'].offsetLeft - (isFixed ? 0 : scrollerLeft);
            } else {
                scrollerLeft = this.#scroller.scrollLeft;
                scrollerTop = this.#scroller.scrollTop;

                this.#y = this._el['nativeElement'].offsetTop + (isFixed ? isFixed.y : -scrollerTop);
                this.#x = this._el['nativeElement'].offsetLeft + (isFixed ? isFixed.x : -scrollerLeft);
            }
            */

            const elData = this._el.nativeElement.getBoundingClientRect()
            this.#y = elData.y;
            this.#x = elData.x;
            this.#width = elData.width;
            this.#height = elData.height;

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

    private _isFixed(elm) {
        var el;
        if (typeof elm === 'object') el = elm[0] || elm;
        else if (typeof elm === 'string') el = document.querySelector(elm);
        while (typeof el === 'object' && el.nodeName.toLowerCase() !== 'body') {
            let style = window.getComputedStyle(el);
            if (style.getPropertyValue('position').toLowerCase() === 'fixed') {
                let x = this._convertPxToNumber(style.getPropertyValue('left'));
                let y = this._convertPxToNumber(style.getPropertyValue('top'));

                return {
                    x: x,
                    y: y,
                };
            }
            el = el.parentElement;
        }
        return null;
    }

    private _convertPxToNumber(val: string) {
        return parseFloat(val.toLowerCase().replace('px', ''));
    }
}
