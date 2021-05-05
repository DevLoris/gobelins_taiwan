import { Mesh, Scene } from "three";
import { SceneElement } from "./elements/SceneElement";
import {ObjectContainerSceneElement} from "./elements/ObjectContainerSceneElement";
import {IStateDataScene, IStateDataSceneEffect, IStateDataSceneElement} from "../../../../store/state_interface_data";
import {CubeSceneElement} from "./elements/CubeSceneElement";
import {IStateDataSceneElementType} from "../../../../store/state_enums";

/**
 * Scenery Utils
 */
export class SceneryUtils {
    public static elements:Mesh[];

    /**
     * Destroy everything from scene
     * @param scene
     */
    static destroyScenery(scene: Scene) {
        while(scene.children.length > 0){
            scene.remove(scene.children[0]);
        }
    }

    /**
     * Build scene elements
     * @param scene
     * @param scene_data
     */
    static buildElementsOf(scene: Scene, scene_data: IStateDataSceneElement[]) {
        this.convertSceneDataToElements(scene_data).forEach(value => {
            let elements = value.prepareElements();
            elements.forEach(element => {
                if(element) {
                    scene.add( element );
                }
            });
        });
    }

    /**
     * Convert data to SceneElement
     * @param scene_data
     */
    static convertSceneDataToElements(scene_data: IStateDataSceneElement[]): SceneElement[] {
        return scene_data.map(value => {
            switch (value.type) {
                case IStateDataSceneElementType.CUBE:
                    return new CubeSceneElement(value.id, value.color, value.options);
                case IStateDataSceneElementType.OBJECT_CONTAINER:
                    return new ObjectContainerSceneElement(value.id, value.gltf, value.options);
            }
        })
    }

    static addEffect(scene: Scene, scene_effect: IStateDataSceneEffect[]) {
        let effect_type = '';
        scene_effect.forEach((effect: IStateDataSceneEffect) => {
            if (effect.type === 'outline') {
                effect_type = 'outline';
            }
        });

        return effect_type;
    }
}
