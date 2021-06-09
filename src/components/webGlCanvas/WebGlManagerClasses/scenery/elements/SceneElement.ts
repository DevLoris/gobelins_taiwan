import {SceneElementOption, SceneElementOptionOutline} from "./SceneElementOption";
import { BackSide, Object3D } from 'three';
import { MeshBasicMaterial } from 'three';
import { Mesh } from 'three';

export abstract class SceneElement {
    protected id: string;

    protected scale: [number, number, number] = [1, 1, 1];
    protected rotation: {x: number, y:  number, z: number} = {x: 0, y:0, z:0};
    protected position: [number, number, number] = [0, 0, 0];
    protected size: {w: number, h: number} = {w: 0, h: 0};
    protected renderTop: boolean = false;
    protected outline: SceneElementOptionOutline = {enable: false};

    protected element: Object3D;

    constructor(id, options: SceneElementOption) {
        this.id = id;
        Object.assign(this, options);
    }

    abstract createElement() : Object3D;

    prepareElements() : Object3D[] {
        let element = this.createElement();
        this.applyModifiers(element);

        let elements = [element];

        if(this.outline.enable) {
            // outline only on mesh
            if(element instanceof Mesh) {
                var outlineMaterial = new MeshBasicMaterial( { color: this.outline.color, side: BackSide } );
                var outlineMesh = new Mesh( element.geometry, outlineMaterial );
                outlineMesh.position.set(...this.position);
                outlineMesh.scale.multiplyScalar(this.outline.stroke);

                elements.push(outlineMesh);
            }
        }

        // add internal item (for this case, useful for raycasting)
        elements.forEach(v => v.userData.internalId = this.id);

        return elements;
    }

    applyModifiers(object: Object3D) {
        object.position.set(...this.position);

        if(this.renderTop) {
            object.renderOrder = 999;
            object.onBeforeRender = function( renderer ) { renderer.clearDepth(); };
        }
    }
}
