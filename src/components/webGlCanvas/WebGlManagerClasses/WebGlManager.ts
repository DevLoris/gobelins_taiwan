import {
    Camera,
    Color,
    PerspectiveCamera,
    REVISION,
    Scene, sRGBEncoding,
    WebGLRenderer,
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OutlineEffect} from "three/examples/jsm/effects/OutlineEffect";
import {addScenery, getState, store} from "../../../store/store";
import {RaycastEvent} from "./events/RaycastEvent";
import {SceneryUtils} from "./scenery/SceneryUtils";
import {selectScene} from "../../../store/store_selector";
import {CAMERA_ASPECT, CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR, STATS_FPS} from "./WebGlVars";
import LightUtils from "./scenery/LightUtils";
import {createEmptyScenery} from "../../../store/store_helper";
import {HdrUtils} from "./scenery/HdrUtils";
import {ConfigureGui} from "./ConfigureGui";

const debug = require("debug")(`front:WebGlManager`);

export class WebGlManager {
    private static instance: WebGlManager;

    private _wrapper:HTMLDivElement = null;

    private _animationLoopId:number = 0;
    private _configureGui:ConfigureGui = null;

    private _renderer : WebGLRenderer = null;
    private _scene : Scene = null;
    private _camera : PerspectiveCamera = null;
    private _control : OrbitControls = null;
    private _raycast : RaycastEvent  = null;

    private _isRunning: boolean = false;

    private _effect: OutlineEffect = null;
    private _effects:  (OutlineEffect|any)[] = [];

    // todo refacto
    public static scene: Scene = null;

    constructor() {
    }


    public static getInstance(): WebGlManager {
        if (!WebGlManager.instance) {
            WebGlManager.instance = new WebGlManager();
        }

        return WebGlManager.instance;
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

        this._setupScene();
        this._setupRenderer();
        this._setupOrbitControls();
        this._setupRaycaster();

        this._startWebGlLoop();
        this._setupStats();

        this.toggleScenery("test");

        window.addEventListener('resize', this._resizeHandler.bind(this));
    }

    /**
     * Setup stats js
     * @private
     */
    private _setupStats():void {
        this._configureGui = new ConfigureGui();
    }

    /**
     * Setup threejs scene and camera
     * @private
     */
    private _setupScene():void {
        this._scene = new Scene();
        this._camera = new PerspectiveCamera( CAMERA_FOV, CAMERA_ASPECT, CAMERA_NEAR, CAMERA_FAR );
        this._camera.position.z = 20;
    }

    /**
     * Setup threejs renderer
     * @private
     */
    private _setupRenderer():void {
        this._renderer = new WebGLRenderer();
        this._renderer.outputEncoding = sRGBEncoding;
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

    // --------------------------------------------------------------------------- LOOP

    /**
     * Start loop
     * @private
     */
    private _startWebGlLoop():void {
        if(!this._isRunning) this._animationLoopId = requestAnimationFrame(this._animationFrame.bind(this));
        this._isRunning = true;
    }

    /**
     * End loop
     * @private
     */
    private _stopWebGlLoop():void {
        cancelAnimationFrame(this._animationLoopId);
        this._isRunning = false;
    }

    /**
     * What happens in one frame
     * @private
     */
    private _animationFrame():void {
        this._configureGui.getStats().begin();

        this._control.update();

        if (this._effects.length == 0) {
            this._renderer.render(this._scene, this._camera);
        } else {
            this._effects.forEach(value => value.render(this._scene, this._camera));
        }

        this._configureGui.getStats().end();

        requestAnimationFrame(this._animationFrame.bind(this));
    }

    // --------------------------------------------------------------------------- SETUP

    /**
     * On window resize, adapt renderer
     * @private
     */
    private _resizeHandler():void {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }

    // --------------------------------------------------------------------------- END INSTANCE

    /**
     * Destroy instances
     * Prevents duplication on hot reload
     */
    public destroy():void {
        this._stopWebGlLoop();
        this._configureGui.destroy();
        this._wrapper.removeChild( this._renderer.domElement );
    }

    public toggleScenery(scene_id: string): void {
        const scene = selectScene(scene_id)(getState().data);

        // ADD SCENE TO STORE
        store.dispatch(addScenery(createEmptyScenery(scene_id)));

        // DESTROY
        SceneryUtils.destroyScenery(this._scene);

        // BUILD SCENE
        SceneryUtils.buildElementsOf(this._scene, scene.content.elements);

        // ADD EFFECTS
        //this._effects = SceneryUtils.addEffects(this._scene, scene.content.effects);
        HdrUtils.loadEnvironment('wow');

        // CONTROL
        this._control.minPolarAngle = scene.orbit.minPolar;
        this._control.maxPolarAngle = scene.orbit.maxPolar;
        this._control.minDistance = scene.orbit.minDistance;
        this._control.maxDistance = scene.orbit.maxDistance;
        this._control.enablePan = false;
        this._control.enableDamping = true;
        this._control.zoomSpeed = 0.5;
        this._control.update();

        // SCENE
        this._scene.background = new Color(scene.scene.background);

        /*const dirLight = new DirectionalLight( 0xffffff, 1 );
        dirLight.position.set( 5, 2, 8 );
        this._scene.add( dirLight );*/

        LightUtils.buildLights(this._scene, scene.content.lights);


        // CAMERA
        // @ts-ignore
        this._camera.position.set(scene.camera.position.x, scene.camera.position.y, scene.camera.position.z);

        // @ts-ignore
        this._control.target.set(scene.orbit.center.x, scene.orbit.center.y, scene.orbit.center.z);
    }

    public getCamera(): Camera {
        return this._camera;
    }

    public getOrbitControls(): OrbitControls {
        return this._control;
    }

    public getScene(): Scene {
        return this._scene;
    }

    public getRenderer(): WebGLRenderer {
        return this._renderer;
    }

    public getEffects() {
        return this._effects;
    }
}
