import {Camera, Raycaster, Scene} from "three";
import RaycastManager from "./RaycastManager";
import {WebGlManager} from "../WebGlManager";
import {gsap} from "gsap";

const debug = require("debug")(`front:RaycastEvent`);

export class RaycastEvent {
    private raycast: Raycaster = new Raycaster();
    private _mouse: {x: number, y: number} = {x: 0, y: 0};

    private _scene: Scene;
    private _camera: Camera;

    constructor(_scene: Scene, _camera: Camera) {
        this._scene = _scene;
        this._camera = _camera;
    }

    /**
     * Returns identifier of touched 3D element.
     * @param scene
     * @param mouse
     * @param camera
     */
    getTouchedElementIdentifier(scene : Scene, mouse, camera : Camera): string {
        // update the picking ray with the camera and mouse position
        this.raycast.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        let intersects = this.raycast.intersectObjects(scene.children, true);

        // Default identifier
        let identifier = "Generic";

        if (intersects.length > 0) {
            intersectsLoops: for (let i = 0; i < intersects.length; i++) {
                // Explore parents until identifier found (max times defined by maxIterations)
                // intersect
                // -> parent (no identifier)
                //      -> parent (no identifier)
                //          -> parent (has identifier!)
                let lastParent = intersects[i].object;
                // @ts-ignore
                // If object has opacity of 0.2 (when camera is inside), it must be ignored
                if (lastParent !== undefined && lastParent.material.opacity !== 0.2) {
                    const maxIterations = 10;
                    parentsloop: for (let j = maxIterations; j > 0; j--) {
                        if (lastParent.userData.internalId !== undefined) {
                            // Get identifier and break loop
                            identifier = lastParent.userData.internalId;
                            break intersectsLoops;
                        } else if (lastParent.parent !== null) {
                            // Iterate in higher level parent
                            lastParent = lastParent.parent;
                        } else {
                            // No identifier or parent, break
                            break parentsloop;
                        }
                    }
                }
            }
        }

        return identifier;
    }

    /**
     * Touch end event callback.
     * @param event
     */
    onTouchEnd(event) {
        let touches = event.changedTouches !== undefined ? event.changedTouches[0] : {clientX: event.clientX, clientY: event.clientY};
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this._mouse.x = (touches.clientX / window.innerWidth) * 2 - 1;
        this._mouse.y = -(touches.clientY / window.innerHeight) * 2 + 1;

        // Get the element identifier
        const touchedElementIdentifier = this.getTouchedElementIdentifier(
            this._scene,
            this._mouse,
            this._camera
        );
    }


    /**
     * Touch start event callback.
     * If camera has moved after the delay given in delayedCall, it was not a click, it was a drag.
     *  -> In that case, don't do anything.
     * @param event
     */
    onTouchStart(event) {
        const camera = WebGlManager.getInstance().getCamera();
        // Get position at time of click
        // Note: we use the following syntax because we need to save the value, not just a reference
        const onTouchCameraPosition = {...camera.position};

        gsap.delayedCall(.3, () => {
            // Get position after delay
            const newCameraPosition = {...camera.position};

            // Remove excessive decimals in coordinates
            this.toFixedHelper(onTouchCameraPosition);
            this.toFixedHelper(newCameraPosition);

            // Since camera is moved by gsap, sometimes we can find a _gsap key inside the camera position object
            // So we remove it to avoid problems with json stringify coming next
            delete onTouchCameraPosition["_gsap"];
            delete newCameraPosition["_gsap"];

            // Compare stringified positions
            if (JSON.stringify(onTouchCameraPosition) === JSON.stringify(newCameraPosition)) {
                // Handle touch if camera isn't moving
                this.handleOnTouchStartEvent(event);
            }
        });
    }

    /**
     * Executed if onTouchStart event is valid
     * @param event
     */
    handleOnTouchStartEvent(event) {
        let touches = event.changedTouches !== undefined ? event.changedTouches[0] : {clientX: event.clientX, clientY: event.clientY};
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this._mouse.x = (touches.clientX / window.innerWidth) * 2 - 1;
        this._mouse.y = -(touches.clientY / window.innerHeight) * 2 + 1;

        // Get the element identifier
        const touchedElementIdentifier = this.getTouchedElementIdentifier(
            this._scene,
            this._mouse,
            this._camera
        );

        RaycastManager.getInstance().clickProcessing(touchedElementIdentifier);
    }

    /**
     * Set number of decimals to 1 in values of given object
     * @param object
     */
    toFixedHelper(object) {
        Object.entries(object).forEach(([key, value]) => {
            if(typeof value === "number") {
                object[key] = value.toFixed(1);
            }
        });
    }
}
