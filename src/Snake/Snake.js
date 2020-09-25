import * as THREE from "three";
import {gsap} from "gsap";

export class Snake {
    constructor(core) {
        this.core = core;

        this.position = new Position(0, 0);
        this.worldPosition = new Position(0, 0);
        this.direction = new Direction(1, 0);
        this.tail = [];
        this.length = 1;

        this.snakeGeometry = new THREE.BoxGeometry(1, 1, 1);
        this.snakeMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
        this.snake = new THREE.Mesh(this.snakeGeometry, this.snakeMaterial);
        this.snake.position.set(this.position.x, this.position.y, 0);

        core.renderer.scene.add(this.snake);

        this.requestedUpdate = core.loop.addUpdate(this.gameLoop);
        this.requestedRender = core.renderer.addUpdate(this.render);
        this.core.viewport.layout(this.layout);
    }

    get cellSize() {
        return this.core.map.gridCellSize;
    }

    layout = () => {
        this.snake.scale.setScalar(this.cellSize);
    }

    gameLoop = () => {
        this.position.x += this.core.inputs.direction.x;
        this.worldPosition.x = this.cellSize * this.position.x;
        this.position.y += this.core.inputs.direction.y;
        this.worldPosition.y = this.cellSize * this.position.y;

        if (this.position.x > (this.core.map.grid.width - this.core.map.grid.width * 0.5)) {
            this.dead = true;
            console.log("dead x");
        } else if (this.position.y > (this.core.map.grid.height - this.core.map.grid.height * 0.5)) {
            this.dead = true;
            console.log('dead y')
        } else if (this.position.x < -(this.core.map.grid.width - this.core.map.grid.width * 0.5)) {
            this.dead = true;
            console.log('dead -x')
        } else if (this.position.y < -(this.core.map.grid.height - this.core.map.grid.height * 0.5)) {
            this.dead = true;
            console.log('dead -y')
        } else {
            this.dead = false;
        }

        if (this.dead) {
            this.core.inputs.direction.x = 0;
            this.core.inputs.direction.y = 0;
        } else {
            // this.snake.position.set(this.worldPosition.x, this.worldPosition.y, 0);
            this.core.map.plane.position.set(this.worldPosition.x, this.worldPosition.y, 0);

            gsap.to(this.snake.position, {
                x: this.worldPosition.x,
                y: this.worldPosition.y,
                duration: this.core.loop.loopInterval / 1000,
                overwrite: true,
                ease: "expo.out"
            })

            gsap.to(this.core.renderer.camera.position, {
                x: this.worldPosition.x,
                y: this.worldPosition.y,
                duration: this.core.loop.loopInterval / 1000,
                overwrite: true,
                ease: "expo.out"
            })
        }
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
