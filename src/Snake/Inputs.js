export class Inputs{
    constructor(core) {
        this.core = core;
        this.direction = new Direction(0, 0);

        this.attach();
    }

    onKeyPress = (e) => {
        switch (e.key){
            case "ArrowUp":
                this.direction.x = 0;
                this.direction.y = 1;
                break;
            case "ArrowDown":
                this.direction.x = 0;
                this.direction.y = -1;
                break;
            case "ArrowLeft":
                this.direction.x = -1;
                this.direction.y = 0;
                break;
            case "ArrowRight":
                this.direction.x = 1;
                this.direction.y = 0;
                break;
        }
    }

    attach(){
        window.addEventListener('keydown', this.onKeyPress);
    }
    detach(){
        window.removeEventListener('keydown', this.onKeyPress);
    }

}

class Direction {
    /**
     * @param {number} x Number between -1 and 1
     * @param {number} y Number between -1 and 1
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
