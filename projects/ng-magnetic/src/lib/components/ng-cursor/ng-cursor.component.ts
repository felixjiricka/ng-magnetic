import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';

export class CursorOptions {
    speed?: number;
    ease?: string;
    visibleTimeout?: number;
}

@Component({
    selector: 'ng-cursor',
    template: `
        <div class="cb-cursor" #cursor>
            <div class="cb-cursor-text" #cursorText></div>
        </div>
    `,
    styleUrls: ['ng-cursor.component.scss'],
})
export class NgCursorComponent implements OnInit, AfterViewInit {
    @ViewChild('cursor') cursorEl: ElementRef<HTMLDivElement>;
    @ViewChild('cursorText') cursorTextEl: ElementRef<HTMLDivElement>;

    hostEl: HTMLElement;

    visible: boolean;

    #pos: {
        x: number;
        y: number;
    };
    #visibleInt: any;
    #stick;

    @Input() options: CursorOptions = {
        speed: 0.7,
        ease: 'expo.out',
        visibleTimeout: 300,
    };

    constructor(private elRef: ElementRef) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.hostEl = this.elRef.nativeElement.parentElement;
        this.initEvents();
    }

    initEvents() {
        const self = this;

        this.hostEl.addEventListener('mouseleave', () => {
            this.hide();
        });

        this.hostEl.addEventListener('mouseenter', () => {
            this.show();
        });

        this.hostEl.addEventListener('mousemove', (e) => {
            this.#pos = {
                x: this.#stick
                    ? this.#stick.x - (this.#stick.x - e.clientX) * 0.15
                    : e.clientX,
                y: this.#stick
                    ? this.#stick.y - (this.#stick.y - e.clientY) * 0.15
                    : e.clientY,
            };
            this.update();
        });

        this.hostEl.addEventListener('mousedown', () => {
            this.setState('-active');
        });

        this.hostEl.addEventListener('mouseup', () => {
            this.removeState('-active');
        });

        // iframe
        this.hostEl.querySelectorAll('a, input, textarea, button').forEach((el) => {
            el.addEventListener('mouseenter', function () {
                self.setState('-pointer');
            });
        });

        this.hostEl.querySelectorAll('a, input, textarea, button').forEach((el) => {
            el.addEventListener('mouseleave', function () {
                self.removeState('-pointer');
            });
        });

        // iframe
        this.hostEl.querySelectorAll('iframe').forEach((el) => {
            el.addEventListener('mouseenter', function () {
                self.hide();
            });
        });

        this.hostEl.querySelectorAll('iframe').forEach((el) => {
            el.addEventListener('mouseleave', function () {
                self.show();
            });
        });

        // cursor
        this.hostEl.querySelectorAll('[data-cursor]').forEach((el) => {
            el.addEventListener('mouseenter', function () {
                self.setState(this.dataset.cursor);
            });
        });

        this.hostEl.querySelectorAll('[data-cursor]').forEach((el) => {
            el.addEventListener('mouseleave', function () {
                self.removeState(this.dataset.cursor);
            });
        });

        // cursor text
        this.hostEl.querySelectorAll('[data-cursor-text]').forEach((el) => {
            el.addEventListener('mouseenter', function () {
                self.setText(this.dataset.cursorText);
            });
        });

        this.hostEl.querySelectorAll('[data-cursor-text]').forEach((el) => {
            el.addEventListener('mouseleave', function () {
                self.removeText();
            });
        });

        // cursor
        this.hostEl.querySelectorAll('[data-cursor]').forEach((el) => {
            el.addEventListener('mouseenter', function () {
                self.setState(this.dataset.cursor);
            });
        });

        this.hostEl.querySelectorAll('[data-cursor]').forEach((el) => {
            el.addEventListener('mouseleave', function () {
                self.removeState(this.dataset.cursor);
            });
        });

        // sticky
        this.hostEl.querySelectorAll('[data-cursor-stick]').forEach((el) => {
            el.addEventListener('mouseenter', function () {
                self.setStick(this.dataset.cursorStick);
            });
        });

        this.hostEl.querySelectorAll('[data-cursor-stick]').forEach((el) => {
            el.addEventListener('mouseleave', function () {
                self.removeStick();
            });
        });
    }

    setState(state) {
        state = state.split(' ');
        state.forEach((element) => {
            this.cursorEl.nativeElement.classList.add(element);
        });
    }

    removeState(state) {
        state = state.split(' ');
        state.forEach((element) => {
            this.cursorEl.nativeElement.classList.remove(element);
        });
    }

    toggleState(state) {
        if (this.cursorEl.nativeElement.classList.contains(state)) {
            this.setState(state);
        } else {
            this.removeState(state);
        }
    }

    setText(text) {
        this.cursorTextEl.nativeElement.innerHTML = text;
        this.cursorEl.nativeElement.classList.add('-text');
    }

    removeText() {
        this.cursorEl.nativeElement.classList.remove('-text');
    }

    setStick(selector) {
        const target = this.hostEl.querySelector(selector) as HTMLElement;
        const bound = target.getBoundingClientRect();

        this.#stick = {
            y: bound.top + target.offsetHeight / 2,
            x: bound.left + target.offsetWidth / 2,
        };
        this.move(this.#stick.x, this.#stick.y, 10);
    }

    removeStick() {
        this.#stick = false;
    }

    update() {
        this.move();
        this.show();
    }

    // move cursor
    move(x?, y?, duration?) {
        gsap.to(this.cursorEl.nativeElement, {
            x: x || this.#pos.x,
            y: y || this.#pos.y,
            force3D: true,
            overwrite: true,
            ease: this.options.ease,
            duration: this.visible ? duration || this.options.speed : 0,
        });
    }

    // show cursor
    show() {
        if (this.visible) return;
        clearInterval(this.#visibleInt);
        this.cursorEl.nativeElement.classList.add('-visible');
        this.#visibleInt = setTimeout(() => (this.visible = true));
    }

    // hide cursor
    hide() {
        clearInterval(this.#visibleInt);
        this.cursorEl.nativeElement.classList.remove('-visible');
        this.#visibleInt = setTimeout(
            () => (this.visible = false),
            this.options.visibleTimeout
        );
    }
}
