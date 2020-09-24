export class Loop {
    constructor(core) {
        /**
         * Loop interval in ms
         * @type {number}
         */
        this.loopInterval = 500;

        this.updates = new Set();

        this.lastCall = 0;

         core.renderer.addUpdate(this.loop);
    }

    loop = () => {
        const now = performance.now();
        if(now >= this.lastCall + this.loopInterval){
            this.lastCall = now;
            this.updates.forEach(fn => fn());
        }
    }

    addUpdate(fn) {
        this.updates.add(fn);

        return () => {
            this.updates.delete(fn);
        }
    }
}
