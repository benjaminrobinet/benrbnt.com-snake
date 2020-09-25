export class Viewport {
    constructor(core) {
        /**
         * @private
         * @type {Set<any>}
         */
        this.toLayout = new Set();
        this.attach()
    }

    get width() {
        return window.innerWidth;
    }

    get height() {
        return window.innerHeight;
    }

    onResize = () => {
        this.toLayout.forEach(fn => fn());
    }


    layout(fn) {
        this.toLayout.add(fn);

        return () => {
            this.toLayout.delete(fn);
        }
    }

    attach() {
        window.addEventListener('resize', this.onResize);
    }
}
