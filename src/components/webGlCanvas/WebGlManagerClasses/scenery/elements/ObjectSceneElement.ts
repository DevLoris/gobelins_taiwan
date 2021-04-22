import { SceneElement } from "./SceneElement";
import { SceneElementOption } from "./SceneElementOption";
import {AssetGLTF} from "../../assets/AssetGLTF";
import {AssetMemory} from "../../assets/AssetMemory";

export class ObjectSceneElement extends SceneElement {
    private path: any;

    constructor(id, path: string, options: SceneElementOption) {
        super(id, options);
        this.path = path;
    }

    createElement() {
        const asset: AssetGLTF = AssetMemory.instance.load(this.id, this.path);
        return asset.gltf.scene;
    }
}
