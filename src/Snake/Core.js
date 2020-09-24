import {Snake} from "./Snake";
import {Map as SMap} from "./Map";
import {Renderer} from "./Renderer";
import {Inputs} from "./Inputs";
import {Loop} from "./Loop";
import {Viewport} from "./Viewport";

export class Core {
    constructor() {
        this.viewport = new Viewport(this);
        this.renderer = new Renderer(this);
        this.loop = new Loop(this);
        this.map = new SMap(this);
        this.snake = new Snake(this);
        this.inputs = new Inputs(this);

        document.body.appendChild(this.renderer.renderer.domElement);

        this.build();
    }

    build() {
        this.viewport.onResize();
    }

    destroy() {

    }
}
