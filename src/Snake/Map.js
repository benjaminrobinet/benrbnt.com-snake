import * as THREE from 'three';
import {Food} from "./Food";

export class Map {
    constructor(core) {
        let distance = core.renderer.camera.position.z;
        let vFov = core.renderer.camera.fov * Math.PI / 180;
        let planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;
        let planeWidthAtDistance = planeHeightAtDistance * core.renderer.camera.aspect;

        this.planeGeometry = new THREE.PlaneGeometry(planeWidthAtDistance, planeHeightAtDistance);
        this.planeMaterial = new THREE.MeshBasicMaterial({color: 0xbfcc03});
        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);

        this.currentFood = null;

        this.grid = {
            width: 10,
            height: 10,
        }

        core.renderer.scene.add(this.plane);

        this.update = core.renderer.addUpdate((renderer, camera, scene) => {

        })

        core.loop.addUpdate(this.handleFood);
    }

    handleFood = () => {
        if(this.currentFood !== null) return;

        this.currentFood = new Food(5, 5);
    }
}
