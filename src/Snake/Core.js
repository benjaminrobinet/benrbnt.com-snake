import {Snake} from "./Snake";
import {Map as SMap} from "./Map";
import {Renderer} from "./Renderer";
import {Inputs} from "./Inputs";
import {Loop} from "./Loop";

export class Core {
    constructor() {
        this.renderer = new Renderer(this);
        this.loop = new Loop(this);
        this.map = new SMap(this);
        this.snake = new Snake(this);
        this.inputs = new Inputs(this);

        document.body.appendChild(this.renderer.renderer.domElement);

        this.build();
    }

    build() {

    }

    destroy() {

    }
}
