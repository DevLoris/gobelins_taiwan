import { SceneElement } from "./SceneElement";
import { SceneElementOption } from "./SceneElementOption";
import {AssetGLTF} from "../../assets/AssetGLTF";
import {AssetMemory} from "../../assets/AssetMemory";
import {InstancedMesh, Mesh, Object3D} from "three";
import {createElement} from "react";

export class MeshObjectSceneElement extends SceneElement {
    private gltfId: any;
    private positions: number[][];
    private _dummy = new Object3D();

    constructor(idInScene, gltfId: string, positions: number[][], options: SceneElementOption) {
        super(idInScene, options);
        this.gltfId = gltfId;
        this.positions = positions;
    }

    createElement() {
        const asset: AssetGLTF = AssetMemory.instance.get(this.gltfId);
        let model =  asset.gltf.scene.children[0];
        if(model instanceof Mesh) {
            let materiel = model.material;
            let geometry = model.geometry.clone();
            let amount = 1000;

            let mesh = new InstancedMesh(geometry, materiel, this.positions.length);
            return mesh;
        }
        return null;
    }

    prepareElements(): Object3D[] {
        let element = this.createElement();
        console.log(element);
        let i = 0;
        this.positions.forEach((v) => {
            this._dummy.position.set( v[0], v[1], v[2] );
            this._dummy.updateMatrix();

            element.setMatrixAt( i ++, this._dummy.matrix );
        });

        return [element];
    }
}
