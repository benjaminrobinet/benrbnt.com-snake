import * as THREE from 'three';

export class Renderer {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        this.camera.position.z = 10;

        this.scene = new THREE.Scene();


        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        /**
         * @private
         */
        this._raf = false;

        this.updates = new Set();

        this.update();
    }

    update = () => {
        this._raf = window.requestAnimationFrame(this.update);

        this.updates.forEach(fn => {
            fn(this.renderer, this.camera, this.scene);
        })

        this.renderer.render(this.scene, this.camera);
    }


    /**
     * @param {function(renderer, camera, scene)} fn
     * @returns {function(): void}
     */
    addUpdate(fn){
        this.updates.add(fn);

        return () => {
            this.updates.delete(fn);
        }
    }
}
