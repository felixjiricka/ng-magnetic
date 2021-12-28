export class CursorOptions {
    speed?: number;
    ease?: string;
    visibleTimeout?: number;
    scroller?: {
        selector: string,
        scrollType: 'normal' | 'transform'
    };
}
