import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from "three";
import { SceneElement } from "./elements/SceneElement";
import { CubeSceneElement } from "./elements/CubeSceneElement";
import { CubeOutlinedSceneElement } from "./elements/CubeOutlinedSceneElement";
import { SpriteSceneElement } from "./elements/SpriteSceneElement";

export class BuildScene {  
    public static elements:Mesh[];


    public static sceneComponents: SceneElement[] = [
        new CubeSceneElement("test", [1, 1, 1], [0, 0, 0], 0x00ff00),
        new CubeSceneElement("test", [1, 1, 1], [2, 0, 0], 0xffff00),
        new CubeOutlinedSceneElement("test", [1, 1, 1], [4, 0, 0], 0xffff00, 0x000fff, 1.05),
        new SpriteSceneElement("sprite", [1, 2, 2], [1, 1, 1], "/public/startup.png"),
    ]

    static buildElements(scene: Scene) { 
        this.sceneComponents.forEach(value => {
            let elements = value.prepareElements();
            elements.forEach(element => {
                scene.add( element );   
            }); 
        });       
    } 
}