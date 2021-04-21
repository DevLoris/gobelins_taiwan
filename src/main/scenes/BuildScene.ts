import { BoxGeometry, Camera, Mesh, MeshBasicMaterial, Scene } from "three";
import { SceneElement } from "./elements/SceneElement";
import { CubeSceneElement } from "./elements/CubeSceneElement";
import { SpriteSceneElement } from "./elements/SpriteSceneElement";
import { FrontPlaneCameraSceneElement } from "./elements/FrontPlaneCameraSceneElement";
import { SceneElementOption } from "./elements/SceneElementOption";
import {ObjectSceneElement} from "./elements/ObjectSceneElement";
import {Signal} from "../../lib/helpers/Signal";

export class BuildScene {
    public static elements:Mesh[];

    public static sceneComponents: SceneElement[] = [
        new CubeSceneElement("test", 0x00ff00, {size: [1, 1, 1], position: [0, 0, 0]}),
        new CubeSceneElement("test", 0xffff00, {size: [1, 1, 1], position: [2, 0, 0]}),
        new CubeSceneElement("test", 0xffff00, {size: [1, 1, 1], position: [4, 0, 0], outline: {enable: true, color: 0x00ff00, stroke: 2.05}}),
        new SpriteSceneElement("sprite", "/public/startup.png", {size:  [1, 2, 2], position: [1, 1, 1], renderTop: true}),
        // new ObjectSceneElement("littlestTokyo", "/public/LittlestTokyo.glb", {}),
    ];

    static buildElements(scene: Scene, camera: Camera) {

        this.sceneComponents.forEach(value => {
            let elements = value.prepareElements();
            elements.forEach(element => {
                scene.add( element );
            });
        });

        // camera test
        /*let frontPlane: FrontPlaneCameraSceneElement = new FrontPlaneCameraSceneElement("overlay", 0x00ff00, {size: [10, 10, 10], position: [0, 0, -100]});
        camera.add(frontPlane.prepareElements()[0]);*/
    }
}
