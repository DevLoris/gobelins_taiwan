import { SceneElement } from "./SceneElement";
import { SceneElementOption } from "./SceneElementOption";
import {AssetGLTF} from "../../assets/AssetGLTF";
import {AssetMemory} from "../../assets/AssetMemory";

export class ObjectSceneElement extends SceneElement {
    private gltfId: any;

    constructor(idInScene, gltfId: string, options: SceneElementOption) {
        super(idInScene, options);
        this.gltfId = gltfId;
    }

    createElement() {
        const asset: AssetGLTF = AssetMemory.instance.get(this.gltfId);
        return asset.gltf.scene;
    }
}
