import { ElementRef } from '@angular/core';
import { gsap } from 'gsap';

export class MagneticCtrl {
    el: ElementRef;
    options;
    y;
    x;
    width;
    height;

    #defaultOptions = {
        y: 0.2,
        x: 0.2,
        s: 0.2,
        rs: 0.7,
    };

    constructor(el, options = {}) {
        console.log(el);
        this.el = el;
        this.options = {...this.#defaultOptions, ...options}

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

            console.log('enter');
        });

        this.el['nativeElement'].addEventListener('mousemove', (e) => {
            const y = (e.clientY - this.y - this.height / 2) * this.options.y;
            const x = (e.clientX - this.x - this.width / 2) * this.options.x;

            this.move(x, y, this.options.s);
        });

        this.el['nativeElement'].addEventListener('mouseleave', (e) => {
            this.move(0, 0, this.options.rs);

            console.log('leave');
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
