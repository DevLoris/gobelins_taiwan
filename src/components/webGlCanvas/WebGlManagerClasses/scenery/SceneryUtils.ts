import { CubeTexture, CubeTextureLoader, Mesh, Scene } from "three";
import { SceneElement } from "./elements/SceneElement";
import {ObjectContainerSceneElement} from "./elements/ObjectContainerSceneElement";
import {IStateDataScene, IStateDataSceneEffect, IStateDataSceneElement} from "../../../../store/state_interface_data";
import {CubeSceneElement} from "./elements/CubeSceneElement";
import {IStateDataSceneEffectsType, IStateDataSceneElementType} from "../../../../store/state_enums";
import {WebGlManager} from "../WebGlManager";
import { SpriteSceneElement } from "./elements/SpriteSceneElement";
import { OutlineCustomEffect } from "./OutlineCustomEffect";

const debug = require("debug")(`front:SceneryUtils`);

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

    static destroyElementByName(name:  string) {
        WebGlManager.getInstance().getScene().children.forEach(value => {
           if(value.userData.internalId && value.userData.internalId == name) {
               let object = WebGlManager.getInstance().getScene().getObjectById(value.id);
               WebGlManager.getInstance().getScene().remove(object);
           }
        });
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
                case IStateDataSceneElementType.SPRITE:
                    return new SpriteSceneElement(value.id, value.sprite, value.options);
            }
        })
    }

    /**
     * Add visual effects
     * @param scene_effect
     */
    static addEffects(scene_effect: IStateDataSceneEffect[]): any[] {
        return scene_effect.map((effect: IStateDataSceneEffect) => {
            switch (effect.type) {
                case IStateDataSceneEffectsType.OUTLINE:
                    return new OutlineCustomEffect(WebGlManager.getInstance().getRenderer());
            }
        });
    }

    /**
     * Creates skybox
     * @param scene
     */
    static createSkybox(scene: IStateDataScene): CubeTexture {
        debug(scene);
        const loader = new CubeTextureLoader();
        if (!scene.scene.skybox || Object.entries(scene.scene.skybox).length === 0) {
            return null;
        }
        return loader.load([
            scene.scene.skybox.posXPath,
            scene.scene.skybox.negXPath,
            scene.scene.skybox.posYPath,
            scene.scene.skybox.negYPath,
            scene.scene.skybox.posZPath,
            scene.scene.skybox.negZPath
        ]);
    }
}
