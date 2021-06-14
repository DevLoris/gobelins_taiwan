import { SceneElement } from "./SceneElement";
import { SceneElementOption } from "./SceneElementOption";
import {AssetGLTF} from "../../assets/AssetGLTF";
import {AssetMemory} from "../../assets/AssetMemory";
import {InstancedMesh, Mesh, Object3D} from "three";
import {createElement} from "react";
import { threadId } from "worker_threads";

const debug = require("debug")(`front:MeshObjectSceneElement`);

export class MeshObjectSceneElement extends SceneElement {
    private gltfId: any;
    private positions: SceneElementOption[];
    private _dummy = new Object3D();

    constructor(idInScene, gltfId: string, positions: SceneElementOption[], options: SceneElementOption) {
        super(idInScene, options);
        this.gltfId = gltfId;
        this.positions = positions;
    }

    createElement() {
        const asset: AssetGLTF = AssetMemory.instance.get(this.gltfId);
        debug(this.gltfId, asset)
        let model =  asset.gltf.scene.children[0];
        if(model instanceof Mesh) {
            let material = model.material;
            let geometry = model.geometry.clone();
            let amount = 1000;

            let mesh = new InstancedMesh(geometry, material, this.positions.length);
            return mesh;
        }
        return null;
    }

    prepareElements(): Object3D[] {
        let element = this.createElement();
        debug(element);
        element.userData.internalId = this.id;
        // Exclue les grilles parce qu'elles sont en noir
        // TODO: Retirer une fois qu'on a trouvé une solution
        if (this.id == 'scene__GridSolo' || this.id == 'scene__GridDouble') {
            element.userData.sprite = true;
        }

        let i = 0;
        this.positions.forEach((v) => {
            debug(v);
            this._dummy.position.set( v.position[0], v.position[1], v.position[2] );
            this._dummy.scale.set(v.scale[0], v.scale[1], v.scale[2]);
            this._dummy.rotation.set(v.rotation.x, v.rotation.y, v.rotation.z);
            this._dummy.updateMatrix();

            element.setMatrixAt( i ++, this._dummy.matrix );
        });

        return [element];
    }
}
