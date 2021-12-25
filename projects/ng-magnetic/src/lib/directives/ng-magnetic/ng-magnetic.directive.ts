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
}

@Directive({
    selector: '[ngMagnetic]',
})
export class NgMagneticDirective implements AfterViewInit{
    _options: MagneticOptions;
    #x;
    #y;
    #width;
    #height;

    onEnter: EventEmitter<any> = new EventEmitter<any>();
    onLeave: EventEmitter<any> = new EventEmitter<any>();

    #defaultOptions: MagneticOptions = {
        hDelta: 0.2, // horizontal delta
        vDelta: 0.2, // vertical delta
        speed: 0.2, // speed
        releaseSpeed: 0.7, // release speed
    };

    @Input('options')
    set options(data: MagneticOptions) {
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
        this._el['nativeElement'].addEventListener('mouseenter', () => {
            this.#y = this._el['nativeElement'].offsetTop - window.pageYOffset;
            this.#x = this._el['nativeElement'].offsetLeft - window.pageXOffset;
            this.#width = this._el['nativeElement'].offsetWidth;
            this.#height = this._el['nativeElement'].offsetHeight;

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
}
