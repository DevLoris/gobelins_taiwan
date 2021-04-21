import {PerspectiveCamera, REVISION, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {RaycastEvent} from "../../../main/scenes/events/RaycastEvent";
import Stats from "stats.js";
import {addScenery, store} from "../../../store/store";
import {createEmptyScenery} from "../../../store/store_helper";
import {BuildScene} from "../../../main/scenes/BuildScene";
import {AudioHandler} from "../../../lib/audio/AudioHandler";

const debug = require("debug")(`front:WebGlManager`);

export class WebGlManager {

    private _wrapper:HTMLDivElement = null;

    private _animationLoopId:number = 0;
    private _stats:Stats = null;

    private _renderer : WebGLRenderer = null;
    private _scene : Scene = null;
    private _camera : PerspectiveCamera = null;
    private _control : OrbitControls = null;
    private _raycast : RaycastEvent  = null;

    constructor() {
    }

    // --------------------------------------------------------------------------- SETUP

    /**
     * Init params & start webgl
     * @param pWrapper div container of canvas
     */
    public initAndStart(pWrapper: HTMLDivElement):void {
        debug("Init WebGlManager", pWrapper);
        debug("ThreeJS version:", REVISION);

        this._wrapper = pWrapper;

        this._setupStats();
        this._setupScene();
        this._setupRenderer();
        this._setupOrbitControls();
        this._setupRaycaster();

        this._prepareWorld();

        this._startWebGlLoop();
    }

    /**
     * Setup stats js
     * @private
     */
    private _setupStats():void {
        this._stats = new Stats();
        this._stats.showPanel(0);
        document.body.appendChild(this._stats.dom);
    }

    /**
     * Setup threejs scene and camera
     * @private
     */
    private _setupScene():void {
        this._scene = new Scene();
        this._camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
        this._camera.position.z = 20;
    }

    /**
     * Setup threejs renderer
     * @private
     */
    private _setupRenderer():void {
        this._renderer = new WebGLRenderer();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        // Add canvas to dom
        this._wrapper.appendChild( this._renderer.domElement );
    }

    /**
     * Setup raycaster
     * @private
     */
    private _setupRaycaster():void {
        const raycastEvent = new RaycastEvent(this._scene, this._camera);
        this._raycast = raycastEvent;
        this._renderer.domElement.addEventListener('pointerdown', raycastEvent.onTouchStart.bind(raycastEvent));
        this._renderer.domElement.addEventListener('pointerup', raycastEvent.onTouchEnd.bind(raycastEvent));
    }

    /**
     * Setup orbit controls
     * @private
     */
    private _setupOrbitControls():void {
        this._control = new OrbitControls(this._camera, this._renderer.domElement);
    }

    /**
     * Create necessary elements for the world to show up
     * @private
     */
    private _prepareWorld():void {
        store.dispatch(addScenery(createEmptyScenery("testScenery")));
        AudioHandler.loadFile();
        BuildScene.buildElements(this._scene, this._camera);
    }

    // --------------------------------------------------------------------------- LOOP

    /**
     * Start loop
     * @private
     */
    private _startWebGlLoop():void {
        this._animationLoopId = requestAnimationFrame(this._animationFrame.bind(this));
    }

    /**
     * End loop
     * @private
     */
    private _stopWebGlLoop():void {
        cancelAnimationFrame(this._animationLoopId);
    }

    /**
     * What happens in one frame
     * @private
     */
    private _animationFrame():void {
        this._stats.begin();

        this._renderer.render(this._scene, this._camera);

        this._stats.end();

        requestAnimationFrame(this._animationFrame.bind(this));
    }

    // --------------------------------------------------------------------------- END INSTANCE

    /**
     * Destroy instances
     * Prevents duplication on hot reload
     */
    public destroy():void {
        this._stopWebGlLoop();
        document.body.removeChild(this._stats.dom);
        this._wrapper.removeChild( this._renderer.domElement );
    }

}
