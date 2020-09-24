import {Core} from "./Snake/Core";

const build = function(){
    this.snakeCore = new Core();
};

document.addEventListener('DOMContentLoaded', build);
