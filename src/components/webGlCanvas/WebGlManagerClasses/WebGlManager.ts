import {
    Camera,
    Color,
    PerspectiveCamera,
    REVISION,
    Scene,
    sRGBEncoding,
    WebGLRenderer,
    Box3,
    Vector3,
    AxesHelper,
    Object3D,
    GridHelper,
    InstancedMesh,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    PlaneGeometry,
    Clock,
    CubeTextureLoader,
    ImageUtils,
    TextureLoader,
    Plane,
    DoubleSide,
    SpriteMaterial,
    Sprite,
    RepeatWrapping,
    Group, AnimationMixer, AnimationClip, LoopRepeat
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OutlineEffect} from "three/examples/jsm/effects/OutlineEffect";
import {activeScenery, getState, store} from "../../../store/store";
import {RaycastEvent} from "./events/RaycastEvent";
import {SceneryUtils} from "./scenery/SceneryUtils";
import {
    selectCollectiblesOfSceneWithPickup,
    selectScene,
    selectUserActiveScene,
    selectUserSequencerProgression
} from "../../../store/store_selector";
import {CAMERA_ASPECT, CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR} from "./WebGlVars";
import LightUtils from "./scenery/LightUtils";
import {HdrUtils} from "./scenery/HdrUtils";
import {ConfigureGui} from "./ConfigureGui";
import {Signal} from "../../../lib/helpers/Signal";
import {AudioHandler} from "../../../lib/audio/AudioHandler";
import NotebookSignal, {NOTEBOOK_SEND} from "../../notebook/notebook-signal";
import {gsap} from "gsap";
import {objectNumberValuesToFixed} from "../../../lib/utils/objectUtils";
import {ICustomStateSettings} from "../../../store/state_interface_experience";
import {CHAPTERS, SequenceManager} from "../../../mainClasses/Sequencer/SequenceManager";
import {zeroToOneRandom} from "../../../lib/utils/mathUtils";
import {TextureAnimator} from "./TextureAnimator";
import {IStateDataSceneCollectibleType} from "../../../store/state_enums";
import {isLocal} from "../../../helpers/DebugHelpers";
import AnimationService, {IGltfAnimations} from "./AnimationService";

const debug = require("debug")(`front:WebGlManager`);

const DO_NOT_SHOW_LOCAL_STAT:boolean = false;
const DO_NOT_SHOW_LOCAL_DEBUG:boolean = true;

const ENABLE_STATS: boolean = !DO_NOT_SHOW_LOCAL_STAT && isLocal();
const ENABLE_DEBUG: boolean = !DO_NOT_SHOW_LOCAL_DEBUG && isLocal();

// Object extremities on each axis
interface IObjectEndCoordinates {
    object: Object3D,
    instancedMeshes: string[],
    xEnds: [number, number],
    yEnds: [number, number],
    zEnds: [number, number]
}

export class WebGlManager {
    private static instance: WebGlManager;

    private _animationMixers: AnimationMixer[] = new Array();
    private _animationClips: any[] = new Array();

    private _clock:Clock;

    private _wrapper:HTMLDivElement = null;
    private _settings:ICustomStateSettings = null;

    private _animationLoopId:number = 0;
    private _configureGui:ConfigureGui = null;

    private _renderer : WebGLRenderer = null;
    private _scene : Scene = null;
    private _camera : PerspectiveCamera = null;
    private _control : OrbitControls = null;
    private _raycast : RaycastEvent  = null;

    private _isRunning: boolean = false;

    private _effects:  (OutlineEffect|any)[] = [];

    private _objectsEndCoordinates: IObjectEndCoordinates[] = new Array();
    private _instancedMeshes: Object3D[] = new Array();
    private _allInstancedMeshes: Object3D[] = new Array();

    private _cameraMoving: boolean = false;
    public allowCameraMovingCheck: boolean = true;

    // todo refacto
    public static scene: Scene = null;

    public onChangeScenery: Signal = new Signal();

    private _renderEnabled: boolean = true;

    private _controlsChangeCount: number = 0;

    private _spritesAnimators = Array();

    private _isControlEnabled: boolean = true;

    private _animatedSprites: any[] = Array();

    private _movingObjects: any[] = new Array();
    private _sceneInvisibleWalls: Mesh[] = new Array();

    private _sceneryName:string;

    constructor() {
    }

    public static getInstance(): WebGlManager {
        if (!WebGlManager.instance) {
            debug("new instance");
            WebGlManager.instance = new WebGlManager();
        }

        return WebGlManager.instance;
    }


    // --------------------------------------------------------------------------- SETUP


    /**
     * Init params & start webgl
     * @param pWrapper div container of canvas
     * @param pSceneryName name of the scenery to be loaded
     */
    public initAndStart(pWrapper: HTMLDivElement, pSceneryName?: string):void {
        debug("Init WebGlManager", pWrapper);
        debug("ThreeJS version:", REVISION);
        debug("pSceneryName", pSceneryName);

        this._sceneryName = pSceneryName;

        this._clock = new Clock();

        this._settings = store.getState().user_data.settings;

        this._wrapper = pWrapper;

        this._setupScene();
        this._setupRenderer();
        this._setupOrbitControls();
        this._setupRaycaster();

        this._startWebGlLoop();

        pSceneryName && this.toggleScenery(pSceneryName);

        window.addEventListener('resize', this._resizeHandler.bind(this));

        this.cameraMovingLoop();

        ENABLE_STATS && this._setupStats();
        ENABLE_DEBUG && this._setDebugHelpers();
    }

    /**
     * Setup stats js
     * @private
     */
    private _setupStats():void {
        ENABLE_STATS && (this._configureGui = new ConfigureGui());
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
        this._renderer = new WebGLRenderer({ antialias: this._settings.antialiasing });
        this._renderer.physicallyCorrectLights = true;
        this._renderer.outputEncoding = sRGBEncoding;
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.setPixelRatio(.9);
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
        this._control.addEventListener("change", this._controlsChangeHandlers.bind(this));
    }

    /**
     * Setup scene children array for later identification
     * @private
     */
    private _setupSceneChildrenArrays(): void {
        this._instancedMeshes = this.getScene().children.filter(object => object instanceof InstancedMesh);

        const animsObject:IGltfAnimations = AnimationService.getInstance().getAnimationFromGltfNamed(this._sceneryName);

        this.getScene().children.forEach(childElement => {
            // Meshes can be found in the Group child
            if(childElement.type === "Group" && childElement.name === "Scene") {

                this._allInstancedMeshes = childElement.children.filter(object => object.name.includes("instance"));

                // debug("instances meshes", this._instancedMeshes)
                // debug("All instanced meshes", this._allInstancedMeshes);

                childElement.children.forEach(object => {
                    // Objects we are looking for (buildings) are Mesh type
                    if(
                        // Get all mesh types
                        object.type === "Mesh"

                        // Excluded meshes
                        && !object.name.includes("SOL")
                    ) {

                        // Moving objects
                        if(object.name.toLowerCase().includes("moving")) {

                            // @ts-ignore
                            object.material.transparent = true;

                            // Add box on object
                            // Get size of mesh
                            // 1. Convert object in box
                            const boxFromObject: Box3 = new Box3().setFromObject(object);
                            // 2. Get size of the box
                            const boxSize: Vector3 = boxFromObject.getSize(new Vector3());

                            // const geometry = new BoxGeometry( boxSize.x, boxSize.y, boxSize.z );
                            // const material = new MeshBasicMaterial( {color: new Color(zeroToOneRandom(), zeroToOneRandom(), zeroToOneRandom()), wireframe: true} );
                            // const box = new Mesh( geometry, material );
                            // box.position.set(0,object.position.y,0);
                            // box.name = "colliderBox:" + object.name;
                            // box["size"] = boxSize;
                            // object.add(box);

                            object["size"] = boxSize;
                            // Will be re-computed at each frame
                            object["maxCoordinates"] = this._computeBoxMaxCoordinates(object);

                            this._movingObjects.push(object);

                            animsObject?.animations?.forEach((anim) => {
                                if(anim.name.toLowerCase() === object.name.toLowerCase().replace("moving", ""))
                                {
                                    if(object.animations.length === 0) {
                                        object.animations = [anim];
                                    }
                                    this._animationMixers.push(new AnimationMixer(object));
                                    this._animationClips.push(object.animations);
                                }
                            });
                        }
                        else {
                            // Get size of mesh
                            // 1. Convert object in box
                            const boxFromObject: Box3 = new Box3().setFromObject(object);
                            // 2. Get size of the box
                            const boxSize: Vector3 = boxFromObject.getSize(new Vector3());

                            const divideFactor = 2;
                            const offset = .5;
                            const objectEndCoordinatesAndMore:IObjectEndCoordinates = {
                                object: object,
                                instancedMeshes: new Array(),
                                xEnds: [ object.position.x - boxSize.x / divideFactor - offset, object.position.x + boxSize.x / divideFactor + offset ],
                                yEnds: [ object.position.y - boxSize.y / divideFactor - offset, object.position.y + boxSize.y / divideFactor + offset ],
                                zEnds: [ object.position.z - boxSize.z / divideFactor - offset, object.position.z + boxSize.z / divideFactor + offset ]
                            }

                            // Look for instanced meshes inside walla
                            this._allInstancedMeshes.forEach((instance) => {
                                if(this._isFirstInsideSecond(instance, objectEndCoordinatesAndMore)) {
                                    objectEndCoordinatesAndMore.instancedMeshes = [...objectEndCoordinatesAndMore.instancedMeshes, instance.name];
                                }
                            });

                            // Add object coordinates to the global array
                            this._objectsEndCoordinates.push(objectEndCoordinatesAndMore);

                            // const geometry = new BoxGeometry( boxSize.x + offset, boxSize.y + offset, boxSize.z + offset );
                            // const material = new MeshBasicMaterial( {color: new Color(zeroToOneRandom(), zeroToOneRandom(), zeroToOneRandom())} );
                            // const cube = new Mesh( geometry, material );
                            // cube.position.set(object.position.x - offset / 2, object.position.y - offset / 2, object.position.z - offset / 2);
                            // this._scene.add(cube);

                            // Add hitboxes
                            this._setHitbox(object, boxSize);

                        }

                    }
                    else if(object.type === "Object3D") {
                        // If object is a pin (hint)
                        if(object.name.includes("pin")) {
                            const nameWithoutPin = object.name.replace("pin", "");
                            // Animated pin
                            let texture = new TextureLoader().load( '/public/pin_seq.png' );
                            this._spritesAnimators.push(new TextureAnimator( texture, 51, 1, 51, 50 )); // texture, #horiz, #vert, #total, duration.
                            const material = new SpriteMaterial( { color: 0xffffff, map: texture, transparent: true } );
                            const sprite = new Sprite( material );
                            sprite.scale.set(.7, .7, .7);
                            const yOffset = 0;
                            sprite.position.set(object.position.x, object.position.y + yOffset, object.position.z);
                            sprite["pinName"] = nameWithoutPin;
                            sprite["visited"]  = false;
                            // Hitbox
                            const hitBoxGeometry = new BoxGeometry( 1.5, 1.5, 1.5 );
                            const hitBoxMaterial = new MeshBasicMaterial( {color: new Color(zeroToOneRandom(), zeroToOneRandom(), zeroToOneRandom())} );
                            // hitBoxMaterial.transparent = true;
                            // hitBoxMaterial.opacity = .4;
                            hitBoxMaterial.visible = false;
                            const hitBox = new Mesh( hitBoxGeometry, hitBoxMaterial );
                            hitBox.position.set(object.position.x, object.position.y - yOffset, object.position.z);
                            hitBox.userData = {
                                internalId: object.name,
                                name: nameWithoutPin,
                            }

                            const group = new Group();

                            if(['pvtiste', 'share', 'test', 'vlog'].includes(nameWithoutPin)) {
                                let label_texture = new TextureLoader().load( `/public/pins/${nameWithoutPin}.png` );
                                const label_material = new SpriteMaterial( { color: 0xffffff, map: label_texture, transparent: true } );
                                const label_sprite = new Sprite( label_material );
                                label_sprite.scale.set(1.5, .3, .7);
                                const yOffset = 0;
                                label_sprite.position.set(object.position.x, object.position.y + yOffset, object.position.z + 1);
                                label_sprite["pinName"] = nameWithoutPin;
                                group.add(label_sprite);
                            }

                            group.add(sprite);
                            this._animatedSprites.push(sprite);
                            group.add(hitBox);

                            this._scene.add(group);
                        }
                    }
                });

                // Start all anims
                this._animationMixers.forEach((mixer, index) => {
                    // const actions = this._animationClips[index].forEach((clip) => {
                    //     return mixer.clipAction(clip);
                    // })
                    // debug(actions , this._animationClips[index])
                    // actions.each().play();

                    const action = mixer.clipAction(this._animationClips[index][0]);
                    action.clampWhenFinished = false;
                    action.play();
                });

            }
        });

        // on pins, set valid sprite if already visited
        const active_scene  = selectUserActiveScene(getState());
        const collectibles  = selectCollectiblesOfSceneWithPickup(active_scene)(getState().data, getState().user_data).filter(value => {
            return value.type == IStateDataSceneCollectibleType.HINT;
        });
        const pickedUpCollectibles = collectibles.filter((collectible) => collectible.pickup === true);

        pickedUpCollectibles.forEach((collectible) => {
            this._animatedSprites.forEach((sprite) => {
                if(sprite.pinName === collectible.id) {
                    this.setSpriteTexturePinValid(sprite);
                }
            });
        });
    }

    private _computeBoxMaxCoordinates(box) {
        return {
            xMax: box.position.x + box.size.x / 2, xMin: box.position.x - box.size.x / 2,
            yMax: box.position.y + box.size.y / 2, yMin: box.position.y - box.size.y / 2,
            zMax: box.position.z + box.size.z / 2, zMin: box.position.z - box.size.z / 2
        }
    }

    public setSpriteTexturePinValid(sprite) {
        let texture = new TextureLoader().load( '/public/pin_check.png' );
        sprite.material = new SpriteMaterial( { color: 0xffffff, map: texture, transparent: true } );
        sprite.scale.set(.4, .4, .4);
    }

    private _setHitbox(obj: Object3D, boxSize: Vector3) {
        let offset = 1;
        const name = obj.name + '-hitbox';
        const material = new MeshBasicMaterial( {color: new Color(zeroToOneRandom(), zeroToOneRandom(), zeroToOneRandom())} );
        let geometry = new BoxGeometry( boxSize.x + offset, 8, boxSize.z + offset );
        let cube = new Mesh( geometry, material );
        switch(obj.name) {
            case "711":
                cube.position.set(obj.position.x, obj.position.y - (boxSize.y / 2 - 4), obj.position.z);
                cube.name = name;
                cube.userData = {
                    internalId: name,
                    name: name
                }
                cube.visible = false;
                this._scene.add(cube);
                break;
            case "computer":
            case "docs":
            case "camera":
            case "desk":
                geometry = new BoxGeometry( boxSize.x, boxSize.y, boxSize.z );
                cube = new Mesh( geometry, material );
                cube.position.set(obj.position.x, obj.position.y, obj.position.z);
                cube.name = name;
                cube.userData = {
                    internalId: name,
                    name: name
                }
                cube.visible = false;
                this._scene.add(cube);
                break;
        }
    }

    private _setDebugHelpers() {
        const axesHelper = new AxesHelper( 5 );
        this._scene.add( axesHelper );

        const gridHelper = new GridHelper( 100, 100 );
        this._scene.add( gridHelper );

    }

    private _currentlyInsideThis:IObjectEndCoordinates;

    // --------------------------------------------------------------------------- HANDLERS

    /**
     * On orbit controls move
     * @private
     */
    private _controlsChangeHandlers(): void {
        if(this._controlsChangeCount === 0) {
            this._toggleInstancedMeshesOpacity(true);
            this._currentlyInsideThis = null;
            this._objectsEndCoordinates.forEach((obj: IObjectEndCoordinates) => {
                // If camera is inside the building
                if(this._isFirstInsideSecond(this._camera, obj)) {
                    this._currentlyInsideThis = obj;
                    // @ts-ignore
                    obj.object.material.transparent = true;
                    // @ts-ignore
                    if(obj.object.material.opacity !== .2) obj.object.material.opacity = .2

                    // Set all instanced meshes opacity
                    this._toggleInstancedMeshesOpacity(false);
                }
                // If camera is not inside the building
                else {
                    // @ts-ignore
                    if(obj.object.material.opacity !== 1) obj.object.material.opacity = 1;
                    // @ts-ignore
                    obj.object.material.transparent = false;
                }
            });
            this._controlsChangeCount++;
        }
        else if(this._controlsChangeCount === 5) {
            this._controlsChangeCount = 0;
        }
        else {
            this._controlsChangeCount++;
        }
    }

    /**
     *
     * @param pVisible
     * @private
     */
    private _toggleInstancedMeshesOpacity(pVisible: boolean) {
        this._instancedMeshes.forEach(childElement => {
            if(!pVisible) {
                this._currentlyInsideThis && this._currentlyInsideThis.instancedMeshes.forEach((instanceName) => {
                    const lowerCaseUserDataId = childElement.userData.internalId.toLowerCase();
                    const lowerCaseInstanceName = instanceName.toLowerCase();
                    if(this._currentlyInsideThis.object.name === "Taipei101") {
                        if(lowerCaseInstanceName.includes("tree") || lowerCaseInstanceName.includes("scooter")) {
                            return;
                        }
                    }

                    if(lowerCaseInstanceName.includes(lowerCaseUserDataId.replace("scene__", ""))) {
                        // @ts-ignore
                        childElement.material.transparent = true;
                        // @ts-ignore
                        childElement.material.opacity = 0.2;
                    }
                });
            }
            else {
                // @ts-ignore
                childElement.material.transparent = false;
                // @ts-ignore
                childElement.material.opacity = 1;
            }
        });
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
        ENABLE_STATS && this._configureGui.getStats().begin();

        if(this._renderEnabled) {
            this._control.update();

            // Sprites facing camera
            this.getScene().children.forEach(value => {
                if (value instanceof Mesh && value.geometry instanceof PlaneGeometry && value.userData.sprite) {
                    value.rotation.y = Math.atan2( ( this._camera.position.x - value.position.x ), (  this._camera.position.z - value.position.z ) );
                }
            });

            // Animated sprites
            let delta = this._clock.getDelta();
            this._spritesAnimators.forEach((sprite) => {
                sprite.update(1000 * delta);
            });

            // Mesh animations
            this._animationMixers.forEach((mixer) => {
                mixer.update(delta);
            });

            // Update moving objects data
            this._updateMovingObjectsAndCheckPosition();

            // Effects
            if (this._effects.length == 0) {
                this._renderer.render(this._scene, this._camera);
            } else {
                this._effects.forEach(value => value.render(this._scene, this._camera));
            }
        }

        ENABLE_STATS && this._configureGui.getStats().end();

        requestAnimationFrame(this._animationFrame.bind(this));
    }

    private _updateMovingObjectsAndCheckPosition() {
        this._movingObjects.forEach((obj) => {

            const mapExtermityValue = 26.5;

            // Object is outside scene
            if(
                obj.position.x > mapExtermityValue || obj.position.x < -mapExtermityValue
                || obj.position.z > mapExtermityValue || obj.position.z < -mapExtermityValue
            ) {
                this._movingObjectFade(obj, false);
            }
            // Object is inside scene
            else {
                this._movingObjectFade(obj, true);
            }
        });
    }

    private _movingObjectFade(obj, pVisible:boolean = true, pDuration:number = .3) {
        const animatedProperty = obj.material;

        if(gsap.isTweening(animatedProperty)) return;

        gsap.killTweensOf(animatedProperty);
        gsap.to(animatedProperty, {
            duration: pDuration,
            opacity: pVisible ? 1 : 0,
        });
    }

    private _twoBoxesCollided(boxA, boxB):boolean {
        return (boxA.maxCoordinates.xMin <= boxB.maxCoordinates.xMax && boxA.maxCoordinates.xMax >= boxB.maxCoordinates.xMin) &&
            (boxA.maxCoordinates.yMin <= boxB.maxCoordinates.yMax && boxA.maxCoordinates.yMax >= boxB.maxCoordinates.yMin) &&
            (boxA.maxCoordinates.zMin <= boxB.maxCoordinates.zMax && boxA.maxCoordinates.zMax >= boxB.maxCoordinates.zMin);
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
        //this._configureGui.destroy();
        this._wrapper.removeChild( this._renderer.domElement );
        this._control.removeEventListener("change", this._controlsChangeHandlers);
    }

    public disableScenery(scene_id: string): void  {
        const previous_scene = selectScene(scene_id)(getState().data);

        // DESTROY
        SceneryUtils.destroyScenery(this._scene);

        this._spritesAnimators = [];
        this._animationMixers = [];
        this._animationClips = [];

        // AMBIENT SOUND DISABLE
        AudioHandler.stop(previous_scene.ambient);
    }

    // --------------------------------------------------------------------------- UTILS

    /**
     * Checks if camera is currently moving.
     */
    public cameraMovingLoop() {
        if(this.allowCameraMovingCheck) {
            // Get position at time of click
            // Note: we use the following syntax because we need to save the value, not just a reference
            const onTouchCameraPosition = {...this._camera.position};

            gsap.delayedCall(.05, () => {
                // Determine camera moving only if camera is controlled by user
                if(this._control.enabled) {
                    // Get position after delay
                    // We save the value because we may need to remove _gsap attribute inside object (see in hasCameraMoved function)
                    const newCameraPosition = {...this._camera.position};

                    this._cameraMoving = this.hasCameraMoved(onTouchCameraPosition, newCameraPosition);
                }

                // Loop
                this.cameraMovingLoop();
            });
        }
    }

    /**
     * Compares two positions of the camera, then determine if it has moved
     * @param oldPosition
     * @param currentPosition
     */
    public hasCameraMoved(oldPosition, currentPosition) {
        // Remove excessive decimals in coordinates
        objectNumberValuesToFixed(oldPosition, 1);
        objectNumberValuesToFixed(currentPosition, 1);

        // Since camera is moved by gsap, sometimes we can find a _gsap key inside the camera position object
        // So we remove it to avoid problems with json stringify coming next
        delete oldPosition["_gsap"];
        delete currentPosition["_gsap"];

        // Compare stringified positions
        return JSON.stringify(oldPosition) !== JSON.stringify(currentPosition);
    }

    /**
     * Returns true if the first object / camera is inside the second object
     * @param first
     * @param second
     * @private
     */
    private _isFirstInsideSecond(first, second: IObjectEndCoordinates): boolean {
        const firstPosition = first.position;
        return (
            firstPosition.x >= second.xEnds[0] && firstPosition.x <= second.xEnds[1]
            && firstPosition.y >= second.yEnds[0] && firstPosition.y <= second.yEnds[1]
            && firstPosition.z >= second.zEnds[0] && firstPosition.z <= second.zEnds[1]
        );
    }

    public toggleScenery(scene_id: string): void {
        // GET NEW SCENE
        const scene = selectScene(scene_id)(getState().data);

        // last scenery
        const previous_scene = selectUserActiveScene(getState());
        this.disableScenery(previous_scene);

        // BUILD SCENE
        SceneryUtils.buildElementsOf(this._scene, scene.content.elements);

        // ADD EFFECTS
        if (this._settings.outline) {
            //non
            //this._effects = SceneryUtils.addEffects(scene.content.effects);
        }
        HdrUtils.loadEnvironment('wow');

        // AMBIENT SOUND
        AudioHandler.play(scene.ambient);

        // CONTROL
        this._isControlEnabled = scene.orbit.enabled;

        this._control.enabled = scene.orbit.enabled;
        this._control.minPolarAngle = scene.orbit.minPolar;
        this._control.maxPolarAngle = scene.orbit.maxPolar;
        this._control.minDistance = scene.orbit.minDistance;
        this._control.maxDistance = scene.orbit.maxDistance;
        this._control.enablePan = false;
        this._control.enableDamping = true;
        this._control.zoomSpeed = 0.5;
        this._control.update();

        // CAMERA
        this._camera.fov = scene.camera.fov;
        this._camera.updateProjectionMatrix();

        // SCENE
        const texture = SceneryUtils.createSkybox(scene);
        this._scene.background = texture || new Color(scene.scene.background);

        LightUtils.buildLights(this._scene, scene.content.lights);

        // CAMERA
        // @ts-ignore
        this._camera.position.set(scene.camera.position.x, scene.camera.position.y, scene.camera.position.z);

        // @ts-ignore
        this._control.target.set(scene.orbit.center.x, scene.orbit.center.y, scene.orbit.center.z);

        // SCENE IS NOW BUILD, UPDATE STORE
        store.dispatch(activeScenery(scene_id));

        // Close notebook
        NotebookSignal.getInstance().sendToNotebook(NOTEBOOK_SEND.TOGGLE, false);

        // Signal update scene
        this.onChangeScenery.dispatch(scene_id);

        this._setupSceneChildrenArrays();
        this.playSequencerOnScene(scene_id);
    }

    public playSequencerOnScene(scene_id: string) {
        // on r??cup la progression actuelle
        let progression = selectUserSequencerProgression(getState());

        // on envoie dans le bon chapitre
        CHAPTERS.forEach((v, k) => {
            if(k > progression.chapter && v.scene == scene_id) {
                SequenceManager.instance.goTo(k);
                return;
            }
        });
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

    public getCameraMoving() {
        return this._cameraMoving;
    }

    public getAnimatedSprites() {
        return this._animatedSprites;
    }

    public toggleRendering(bool: boolean)  {
        this._renderEnabled = bool;
        if(this._control instanceof OrbitControls)
            this._control.enabled = this._isControlEnabled && bool;
    }
}
