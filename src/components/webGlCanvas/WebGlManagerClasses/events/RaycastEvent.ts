import {Camera, Raycaster, Scene, Vector3} from "three";
import RaycastManager from "./RaycastManager";
import {WebGlManager} from "../WebGlManager";
import {gsap} from "gsap";

const debug = require("debug")(`front:RaycastEvent`);

export class RaycastEvent {
    private raycast: Raycaster = new Raycaster();
    private _mouse: {x: number, y: number} = {x: 0, y: 0};

    private readonly _scene: Scene;
    private readonly _camera: Camera;

    // Whether click is held or not
    private _clickHeld: boolean = false;

    private _justReleased:boolean = false;

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
    getTouchedElementIdentifierFrom(scene : Scene, mouse, camera : Camera): string {
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

    private _onReleaseIdentifier:string;
    private _onReleaseCameraPosition:Vector3;

    /**
     * Touch end event callback.
     * @param event
     */
    onTouchEnd(event) {
        this._clickHeld = false;

        this._justReleased = true;
        gsap.delayedCall(0.15, () => {
            this._justReleased = false;
        });

        this._onReleaseIdentifier = this.getPointedElementIdentifier(event);
        this._onReleaseCameraPosition = WebGlManager.getInstance().getCamera().position;
    }

    /**
     * Touch start event callback.
     * If camera has moved after the delay given in delayedCall, it was not a click, it was a drag.
     * If camera is moving, but click was released at the time of click, consider it.
     * @param event
     */
    onTouchStart(event) {
        this._clickHeld = true;

        const onClickIdentifier = this.getPointedElementIdentifier(event);

        gsap.delayedCall(.25, () => {
            const cameraMoving = WebGlManager.getInstance().getCameraMoving();

            // TODO A TESTER
            // si on a bougé entre le click et le relachement, on drag.
            // Si on bouge déjà ET que on click, c'est un click validé.
            // Si on bouge pas c'est un click validé

            if (
                // If camera is not moving & click is not held (single click)
                !cameraMoving && !this._clickHeld
                // Prevents detecting click while quick dragging
                || !this._clickHeld && cameraMoving && !this._justReleased && this._onReleaseIdentifier !== onClickIdentifier
                // // Or camera moving and user is not dragging (just a click while camera is moving)
                // // || !(!this._clickHeld && cameraMoving && this._justReleased)
                // || !(this._justReleased && cameraMoving)
            ) {
                this.handleOnTouchStartEvent(event);
            }
        });
    }

    /**
     * Executed if onTouchStart event is valid
     * @param event
     */
    handleOnTouchStartEvent(event: PointerEvent) {
        // If object pointed is different that at the time of initial click, process
        RaycastManager.getInstance().clickProcessing(this.getPointedElementIdentifier(event));
    }

    /**
     * Returns the object identifier found in event param
     * @param event
     */
    getPointedElementIdentifier(event: PointerEvent) {
        // @ts-ignore
        let touches = event.changedTouches !== undefined ? event.changedTouches[0] : {clientX: event.clientX, clientY: event.clientY};
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this._mouse.x = (touches.clientX / window.innerWidth) * 2 - 1;
        this._mouse.y = -(touches.clientY / window.innerHeight) * 2 + 1;

        // Return the element identifier
        return this.getTouchedElementIdentifierFrom(
            this._scene,
            this._mouse,
            this._camera
        );
    }
}
