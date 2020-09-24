import * as THREE from 'three';
import {Food} from "./Food";

export class Map {
    constructor(core) {
        this.core = core;

        this.currentFood = null;

        this.grid = {
            width: 10,
            height: 10,
        }

        this.planeGeometry = new THREE.PlaneGeometry(1, 1);
        this.planeMaterial = new THREE.MeshBasicMaterial({color: 0xbfcc03});
        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);

        this.gridGeometry = new THREE.PlaneGeometry(1, 1);
        this.gridEdges = new THREE.EdgesGeometry(this.gridGeometry);
        this.gridMesh = new THREE.LineBasicMaterial({color: 0x000000});
        this.gridLines = new THREE.LineSegments(this.gridEdges, this.gridMesh);

        this.core.renderer.scene.add(this.plane, this.gridLines);

        this.core.loop.addUpdate(this.handleFood);
        this.core.viewport.layout(this.layout);
    }

    layout = () => {
        let distance = this.core.renderer.camera.position.z;
        let vFov = this.core.renderer.camera.fov * Math.PI / 180;
        let planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;

        this.gridLines.scale.x = planeHeightAtDistance * this.core.renderer.camera.aspect - 50;
        this.gridLines.scale.y = planeHeightAtDistance - 50;

        this.plane.scale.x = planeHeightAtDistance * this.core.renderer.camera.aspect;
        this.plane.scale.y = planeHeightAtDistance;
    }

    handleFood = () => {
        if (this.currentFood !== null) return;

        this.currentFood = new Food(5, 5);
    }
}
