import * as THREE from "three";

export class Snake {
    constructor(core) {
        this.core = core;

        this.position = new Position(0, 0);
        this.direction = new Direction(0, 0);
        this.tail = [];
        this.length = 1;

        this.grid = core.map.grid;

        let cellSize = Math.max(core.viewport.width / this.grid.width, core.viewport.height / this.grid.height);

        this.snakeGeometry = new THREE.BoxGeometry(cellSize, cellSize, cellSize);
        this.snakeMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
        this.snake = new THREE.Mesh(this.snakeGeometry, this.snakeMaterial);
        this.snake.position.set(this.position.x, this.position.y, 0);

        core.renderer.scene.add(this.snake);

        this.requestedUpdate = core.loop.addUpdate(this.gameLoop);
    }

    gameLoop = () => {
        this.position.x += this.core.viewport.width / this.grid.width * this.direction.x;
        this.position.y += this.core.viewport.height / this.grid.height * this.direction.y;

        if (this.position.x > this.grid.width || this.position.y > this.grid.height) {
            console.log('dead');
        }


        this.snake.position.set(this.position.x, this.position.y, 0);

        this.render();
    }

    render() {

    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
