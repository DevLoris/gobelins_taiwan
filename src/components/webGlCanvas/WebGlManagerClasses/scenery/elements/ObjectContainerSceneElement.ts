import { SceneElement } from "./SceneElement";
import { SceneElementOption } from "./SceneElementOption";
import {AssetGLTF} from "../../assets/AssetGLTF";
import {AssetMemory} from "../../assets/AssetMemory";
import {Object3D} from "three";
import {MeshObjectSceneElement} from "./MeshObjectSceneElement";
import {WebGlManager} from "../../WebGlManager";
import {DEFAULT_SCALE_FACTOR} from "../../WebGlVars";

export class ObjectContainerSceneElement extends SceneElement {
    private gltfId: any;

    constructor(idInScene, gltfId: string, options: SceneElementOption) {
        super(idInScene, options);
        this.gltfId = gltfId;
    }

    createElement() {
        const asset: AssetGLTF = AssetMemory.instance.get(this.gltfId);

        let toModify: IObjectContainerMeshInstance[] = [];

        // pré-traitement
        asset.gltf.scene.children.forEach(value => {
            let name = value.userData.name;
            if(name && name.startsWith("instance:")) {
                const data =  name.split(":");

                let element = toModify.find(value1 => value1.id == data[1]);
                if(element) {
                    element.amount++;
                    element.objects.push(value);
                }
                else {
                    toModify.push({id: data[1], amount: 1, objects: [value]});
                }
            }
        });

        toModify.forEach(value => {
            let mesh = new MeshObjectSceneElement(this.id +  "__" + value.id, value.id, value.objects.map(
                v => {
                    return {
                        position: [
                            this.position[0] + v.position.x * this.scale[0] * DEFAULT_SCALE_FACTOR,
                            this.position[1] + v.position.y * this.scale[1] * DEFAULT_SCALE_FACTOR,
                            this.position[2] + v.position.z * this.scale[2] * DEFAULT_SCALE_FACTOR
                        ],
                        scale: [
                            v.scale.x * this.scale[0] * DEFAULT_SCALE_FACTOR,
                            v.scale.y * this.scale[1] * DEFAULT_SCALE_FACTOR,
                            v.scale.z * this.scale[2] * DEFAULT_SCALE_FACTOR
                        ],
                        rotation: {
                            x: this.rotation.x + v.rotation.x,
                            y: this.rotation.y + v.rotation.y,
                            z: this.rotation.z + v.rotation.z
                        }
                    }
                }
            ), {});
            WebGlManager.getInstance().getScene().add(...mesh.prepareElements());
        });

        return asset.gltf.scene;
    }
}

interface IObjectContainerMeshInstance {
    id: string;
    amount: number;
    objects: Object3D[]
}
