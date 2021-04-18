import * as THREE from "three";
import Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { BuildScene } from './scenes/BuildScene';

const debug = require("debug")(`front:Game`);

export class Game {
    // --------------------------------------------------------------------------- SINGLETON

    /**
     * Create an instance if it doesn't already exist when instance method
     */
    protected static __instance: Game;

    static get instance(): Game {
        if (this.__instance == null) this.__instance = new Game();
        return this.__instance;
    }

    // --------------------------------------------------------------------------- LOCAL

    private __animationLoopId = 0;
    private __stats = null;

    private __renderer = null;
    private __scene = null;
    private __camera = null;
    private __control = null;

    public  init(parentElement) {
        debug("ThreeJS version:", THREE.REVISION);

        Game.instance.__stats = new Stats();
        Game.instance.__stats.showPanel(0);
        document.body.appendChild(this.__stats.dom);

        Game.instance.__scene = new THREE.Scene();
        Game.instance.__camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
        Game.instance.__camera.position.z = 20; 

        Game.instance.__renderer = new THREE.WebGLRenderer();
        Game.instance.__renderer.setSize( window.innerWidth, window.innerHeight );
        parentElement.appendChild( Game.instance.__renderer.domElement );
        
        
        Game.instance.__control = new OrbitControls(Game.instance.__camera, Game.instance.__renderer.domElement);
    }

    public  start() {
        Game.instance.__animationLoopId = requestAnimationFrame( Game.instance.animate );
        
        BuildScene.buildElements(Game.__instance.__scene);
    }

    public stop() {
        cancelAnimationFrame(this.__animationLoopId);
    }

    private  animate() {
        Game.instance.__stats.begin(); 

        Game.instance.__renderer.render( Game.instance.__scene, Game.instance.__camera );

        Game.instance.__stats.end();

        requestAnimationFrame( Game.instance.animate );
    }
}
