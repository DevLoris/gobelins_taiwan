import { Mesh, Scene } from "three";
import { SceneElement } from "./elements/SceneElement";
import { CubeSceneElement } from "./elements/CubeSceneElement";
import { SpriteSceneElement } from "./elements/SpriteSceneElement";
import {ObjectSceneElement} from "./elements/ObjectSceneElement";
import {MeshObjectSceneElement} from "./elements/MeshObjectSceneElement";

const SPREAD = 100;
const DOORS = 1000;

export class SceneryUtils {
    public static elements:Mesh[];

    public static sceneComponents: SceneElement[] = [
        // new CubeSceneElement("test", 0x00ff00, {size: [1, 1, 1], position: [0, 0, 0]}),
        // new CubeSceneElement("test", 0xffff00, {size: [1, 1, 1], position: [2, 0, 0]}),
        // new CubeSceneElement("test", 0xffff00, {size: [1, 1, 1], position: [4, 0, 0], outline: {enable: true, color: 0x00ff00, stroke: 2.05}}),
        // new SpriteSceneElement("sprite", "/public/startup.png", {size:  [1, 2, 2], position: [1, 1, 1], renderTop: true}),
        // @ts-ignore
        new MeshObjectSceneElement("raohe", "raohe",  [...Array(DOORS).keys()].map((v) => {
            return [(SPREAD/2) - Math.random() * SPREAD, Math.random() * 50, (SPREAD/2) - Math.random() * SPREAD]
        }), {}),
        //new ObjectSceneElement("littlestTokyo", "demoModel", {}),
    ];

    static buildElementsOf(scene: Scene) {

        this.sceneComponents.forEach(value => {
            let elements = value.prepareElements();
            elements.forEach(element => {
                if(element) {
                    scene.add( element );
                }
            });
        });
    }
}
