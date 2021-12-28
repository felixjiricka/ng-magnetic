export class Utils {
    static getScrollTransform(selector: string) {
        let elementToParse = document.querySelector(selector);

        let style = window.getComputedStyle(elementToParse);
        let transProperty = style.getPropertyValue('transform');

        if (transProperty == 'none') return null;

        let matrixValues = transProperty.match(/-?\d+\.?\d*/g);

        return {
            left: Math.abs(parseFloat(matrixValues[4])),
            top: Math.abs(parseFloat(matrixValues[5])),
        };
    }
}
