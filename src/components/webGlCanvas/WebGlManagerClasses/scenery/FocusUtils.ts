import {ICoord} from "../../../../store/state_interface_data";
import {WebGlManager} from "../WebGlManager";
import {gsap} from "gsap";

const FOCUS_DURATION = 2;

class FocusUtils {
    // for restoration
    static focusPositionBackup: ICoord;
    static focusTargetBackup: ICoord;

    /**
     * Set focus on a precise point
     * @param coords
     * @param rotation
     */
    static focusOn(coords: ICoord, rotation: ICoord) {
        let camera = WebGlManager.getInstance().getCamera();
        let orbit = WebGlManager.getInstance().getOrbitControls();

        this.focusPositionBackup = {x: camera.position.x, y: camera.position.y, z: camera.position.z};
        this.focusTargetBackup = {x: orbit.target.x, y: orbit.target.y, z: orbit.target.z};

        gsap.to(camera.position, {
            x: coords.x,
            y: coords.y,
            z: coords.z,
            duration: FOCUS_DURATION
        });

        gsap.to(orbit.target, {
            x: rotation.x,
            y: rotation.y,
            z: rotation.z,
            duration: FOCUS_DURATION,
            onUpdate: function () {
                orbit.update();
            }
        });

        orbit.enabled = false;
    }

    /**
     * Restore focus to init point
     */
    static restore() {
        let camera = WebGlManager.getInstance().getCamera();
        let orbit = WebGlManager.getInstance().getOrbitControls();

        gsap.to(camera.position, {
            x: this.focusPositionBackup.x,
            y: this.focusPositionBackup.y,
            z: this.focusPositionBackup.z,
            duration: FOCUS_DURATION,
            onComplete: () => {
                orbit.enabled = true;
                orbit.enableZoom = true;
            }
        });

        gsap.to(orbit.target, {
            x: this.focusTargetBackup.x,
            y: this.focusTargetBackup.y,
            z: this.focusTargetBackup.z,
            duration: FOCUS_DURATION,
            onUpdate: function () {
                orbit.update();
            }
        });

    }
}

export default FocusUtils;