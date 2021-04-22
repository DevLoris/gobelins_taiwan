import { Mesh, Scene } from "three";
import { SceneElement } from "./elements/SceneElement";
import { CubeSceneElement } from "./elements/CubeSceneElement";
import { SpriteSceneElement } from "./elements/SpriteSceneElement";

export class SceneryUtils {
    public static elements:Mesh[];

    public static sceneComponents: SceneElement[] = [
        new CubeSceneElement("test", 0x00ff00, {size: [1, 1, 1], position: [0, 0, 0]}),
        new CubeSceneElement("test", 0xffff00, {size: [1, 1, 1], position: [2, 0, 0]}),
        new CubeSceneElement("test", 0xffff00, {size: [1, 1, 1], position: [4, 0, 0], outline: {enable: true, color: 0x00ff00, stroke: 2.05}}),
        new SpriteSceneElement("sprite", "/public/startup.png", {size:  [1, 2, 2], position: [1, 1, 1], renderTop: true}),
        // new ObjectSceneElement("littlestTokyo", "/public/sceneries/demo/LittlestTokyo.glb", {}),
    ];

    static buildElementsOf(scene: Scene/*, elements: SceneElement[]*/) {

        this.sceneComponents.forEach(value => {
            let elements = value.prepareElements();
            elements.forEach(element => {
                scene.add( element );
            });
        });
    }
}
