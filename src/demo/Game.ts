import Stats from "stats.js";
import { BuildScene } from './scenes/BuildScene';
import {RaycastEvent} from "./scenes/events/RaycastEvent";
import {PerspectiveCamera, REVISION, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {addScene, getState, store} from "../store/store";
import {createEmptyScene} from "../store/store_helper";
import {AudioHandler} from "../lib/audio/AudioHandler";

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

    private __renderer : WebGLRenderer = null;
    private __scene : Scene = null;
    private __camera : PerspectiveCamera = null;
    private __control : OrbitControls = null;
    private __raycast : RaycastEvent  = null;

    public init(parentElement): void {
        debug("ThreeJS version:", REVISION);

        Game.instance.__stats = new Stats();
        Game.instance.__stats.showPanel(0);
        document.body.appendChild(this.__stats.dom);

        Game.instance.__scene = new Scene();
        Game.instance.__camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
        Game.instance.__camera.position.z = 20;

        Game.instance.__renderer = new WebGLRenderer();
        Game.instance.__renderer.setSize( window.innerWidth, window.innerHeight );
        parentElement.appendChild( Game.instance.__renderer.domElement );

        this.setupEvents();

        Game.instance.__control = new OrbitControls(Game.instance.__camera, Game.instance.__renderer.domElement);
        // Game.instance.__control.enablePan = false;
        // Game.instance.__control.enableDamping = true;
    }

    public setupEvents(): void {
        const raycastEvent = new RaycastEvent(Game.__instance.__scene, Game.__instance.__camera);
        this.__raycast = raycastEvent;
        Game.instance.__renderer.domElement.addEventListener('pointerdown', raycastEvent.onTouchStart.bind(raycastEvent));
        Game.instance.__renderer.domElement.addEventListener('pointerup', raycastEvent.onTouchEnd.bind(raycastEvent));
    }

    public  start() {
        Game.instance.__animationLoopId = requestAnimationFrame( Game.instance.animate );
        store.dispatch(addScene(createEmptyScene("test")));
        AudioHandler.loadFile();
        BuildScene.buildElements(Game.__instance.__scene, Game.__instance.__camera);
    }

    public stop(): void {
        cancelAnimationFrame(this.__animationLoopId);
    }

    private animate(): void {
        Game.instance.__stats.begin();

        Game.instance.__renderer.render( Game.instance.__scene, Game.instance.__camera );

        Game.instance.__stats.end();


        requestAnimationFrame( Game.instance.animate );
    }
}
