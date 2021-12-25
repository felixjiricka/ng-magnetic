import gsap from 'gsap';

export class CursorOptions {
    container: string;
    speed: number;
    ease: string;
    visibleTimeout: number;
}

export class Cursor {
    options: CursorOptions;
    body;
    el;
    text;

    #pos;
    #stick;
    visible;
    #visibleInt;

    #defaultOptions: CursorOptions = {
        container: "body",
        speed: 0.7,
        ease: "expo.out",
        visibleTimeout: 300
    };

    constructor(options) {
        this.options = {...this.#defaultOptions, ...options};

        this.body = document.querySelector(this.options.container);

        let tmp = document.createElement('div');
        tmp.classList.add('cb-cursor');
        this.el = tmp;

        let cursorTextEl = document.createElement('div');
        cursorTextEl.classList.add('cb-cursor-text');
        this.text = cursorTextEl;
        this.init();
    }

    init() {
        this.el.append(this.text);
        this.body.append(this.el);
        this.bind();
        this.move(-window.innerWidth, -window.innerHeight, 0);
    }

    bind() {
        const self = this;

        this.body.on('mouseleave', () => {
            self.hide();
        }).on('mouseenter', () => {
            self.show();
        }).on('mousemove', (e) => {
            this.#pos = {
                x: this.#stick ? this.#stick.x - ((this.#stick.x - e.clientX) * 0.15) : e.clientX,
                y: this.#stick ? this.#stick.y - ((this.#stick.y - e.clientY) * 0.15) : e.clientY
            };
            this.update();
        }).on('mousedown', () => {
            self.setState('-active');
        }).on('mouseup', () => {
            self.removeState('-active');
        }).on('mouseenter', 'a,input,textarea,button', () => {
            self.setState('-pointer');
        }).on('mouseleave', 'a,input,textarea,button', () => {
            self.removeState('-pointer');
        }).on('mouseenter', 'iframe', () => {
            self.hide();
        }).on('mouseleave', 'iframe', () => {
            self.show();
        }).on('mouseenter', '[data-cursor]', function () {
            self.setState(this.dataset.cursor);
        }).on('mouseleave', '[data-cursor]', function () {
            self.removeState(this.dataset.cursor);
        }).on('mouseenter', '[data-cursor-text]', function () {
            self.setText(this.dataset.cursorText);
        }).on('mouseleave', '[data-cursor-text]', function () {
            self.removeText();
        }).on('mouseenter', '[data-cursor-stick]', function () {
            self.setStick(this.dataset.cursorStick);
        }).on('mouseleave', '[data-cursor-stick]', function () {
            self.removeStick();
        });
    }

    setState(state) {
        this.el.addClass(state);
    }

    removeState(state) {
        this.el.removeClass(state);
    }

    toggleState(state) {
        this.el.toggleClass(state);
    }

    setText(text) {
        this.text.html(text);
        this.el.addClass('-text');
    }

    removeText() {
        this.el.removeClass('-text');
    }

    setStick(el) {
        console.log(el);
        const target = el;
        const bound = target.getBoundingClientRect();
        this.#stick = {
            y: bound.top + (target.height() / 2),
            x: bound.left + (target.width() / 2)
        };
        this.move(this.#stick.x, this.#stick.y, 5);
    }

    removeStick() {
        this.#stick = false;
    }

    update() {
        this.move();
        this.show();
    }

    move(x?, y?, duration?) {
        gsap.to(this.el, {
            x: x || this.#pos.x,
            y: y || this.#pos.y,
            force3D: true,
            overwrite: true,
            ease: this.options.ease,
            duration: this.visible ? (duration || this.options.speed) : 0
        });
    }

    show() {
        if (this.visible) return;
        clearInterval(this.#visibleInt);
        this.el.addClass('-visible');
        this.#visibleInt = setTimeout(() => this.visible = true);
    }

    hide() {
        clearInterval(this.#visibleInt);
        this.el.removeClass('-visible');
        this.#visibleInt = setTimeout(() => this.visible = false, this.options.visibleTimeout);
    }
}
