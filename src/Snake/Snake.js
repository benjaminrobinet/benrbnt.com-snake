import * as THREE from "three";

export class Snake {
    constructor(core) {
        this.position = new Position(0, 0);
        this.direction = new Direction(0, 0);
        this.length = 1;

        this.grid = core.map.grid;

        this.snakeGeometry = new THREE.PlaneGeometry(1, 1);
        this.snakeMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
        this.snake = new THREE.Mesh(this.snakeGeometry, this.snakeMaterial);

        this.requestedUpdate = core.loop.addUpdate(this.gameLoop);
    }

    gameLoop = () => {

    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Direction{
    /**
     * @param {number} x Number between -1 and 1
     * @param {number} y Number between -1 and 1
     */
    constructor(x = 0, y = 0) {
        this.directionX = x;
        this.directionY = y;
    }
}
