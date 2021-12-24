import { ElementRef, EventEmitter } from '@angular/core';
import { gsap } from 'gsap';

export class MagneticOptions {
    hDelta: number;
    vDelta: number;
    speed: number;
    releaseSpeed: number;
}

export class MagneticCtrl {
    el: ElementRef;
    options;
    y;
    x;
    width;
    height;

    onEnter: EventEmitter<any> = new EventEmitter<any>();
    onLeave: EventEmitter<any> = new EventEmitter<any>();

    #defaultOptions: MagneticOptions = {
        hDelta: 0.2, // horizontal delta
        vDelta: 0.2, // vertical delta
        speed: 0.2, // speed
        releaseSpeed: 0.7, // release speed
    };

    constructor(el, options = {}) {
        this.el = el;
        this.options = { ...this.#defaultOptions, ...options };

        this.y = 0;
        this.x = 0;
        this.width = 0;
        this.height = 0;

        /*
        if (this.el.('magnetic-init')) return;
        this.el.data('magnetic-init', true);

        */
        this.bind();
    }

    bind() {
        this.el['nativeElement'].addEventListener('mouseenter', () => {
            this.y = this.el['nativeElement'].offsetTop - window.pageYOffset;
            this.x = this.el['nativeElement'].offsetLeft - window.pageXOffset;
            this.width = this.el['nativeElement'].offsetWidth;
            this.height = this.el['nativeElement'].offsetHeight;

            this.onEnter.emit('enter');
        });

        this.el['nativeElement'].addEventListener('mousemove', (e) => {
            const y = (e.clientY - this.y - this.height / 2) * this.options.vDelta;
            const x = (e.clientX - this.x - this.width / 2) * this.options.hDelta;

            this.move(x, y, this.options.speed);
        });

        this.el['nativeElement'].addEventListener('mouseleave', (e) => {
            this.move(0, 0, this.options.releaseSpeed);

            this.onLeave.emit('leave');
        });
    }

    move(x, y, speed) {
        gsap.to(this.el['nativeElement'], {
            y: y,
            x: x,
            force3D: true,
            overwrite: true,
            duration: speed,
        });
    }
}
