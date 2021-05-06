
import * as dat from 'dat.gui';
import Stats from "stats.js";
import {WebGlManager} from "./WebGlManager";

const STATS_FPS = 0;

const debug = require("debug")(`front:GUI`);

export class ConfigureGui {
    private _gui: dat.GUI;
    private _stats = new Stats();

    constructor() {
        this._gui =  new dat.GUI();
        this._gui.width = "300px";
        this._stats =  new Stats();
        this.statGui();
        this.statCamera();
    }

     statGui() {

        let stats = this._stats;
        stats.domElement.height = '48px';
        [].forEach.call(stats.domElement.children, (child) => (child.style.display = ''));

        let perfFolder = this._gui.addFolder("Performance");
        let perfLi = document.createElement("li");
        stats.domElement.style.position = "static";
        perfLi.appendChild(stats.domElement);
        perfLi.classList.add("gui-stats");
        perfFolder.__ul.appendChild(perfLi);
    }

    statCamera() {
        const settings =  {
            freecam: false
        }

        let instance = WebGlManager.getInstance();

        let perfFolder = this._gui.addFolder("Caméra");
        perfFolder.add(instance.getOrbitControls(), 'enabled').name('Free Caméra').onChange(function() { });
        perfFolder.add(instance.getOrbitControls().target, 'x', -20, 20, 0.1).name('Target X').onChange(function() { });
        perfFolder.add(instance.getOrbitControls().target, 'y', -20, 20, 0.1).name('Target Y').onChange(function() { });
        perfFolder.add(instance.getOrbitControls().target, 'z', -20, 20, 0.1).name('Target Z').onChange(function() { });
        perfFolder.add(instance.getCamera().position, 'x', -20, 20, 0.1).name('Caméra X').onChange(function() { });
        perfFolder.add(instance.getCamera().position, 'y', -20, 20, 0.1).name('Caméra Y').onChange(function() { });
        perfFolder.add(instance.getCamera().position, 'z', -20, 20, 0.1).name('Caméra Z').onChange(function() { });

    }

    destroy() {
        this._gui.destroy();
    }

    public getStats() {
        return  this._stats;
    }
}


