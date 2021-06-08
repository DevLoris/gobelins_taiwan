import {Camera, Raycaster, Scene} from "three";
import RaycastManager from "./RaycastManager";

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

    getTouchedElementIdentifier(scene : Scene, mouse, camera : Camera) {
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
                if (lastParent !== undefined) {
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
     * Touch event callback.
     * @param event
     */
    onTouchStart(event) {
        // debug("event", event);
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
        debug(this._mouse, touchedElementIdentifier);
    }
}
