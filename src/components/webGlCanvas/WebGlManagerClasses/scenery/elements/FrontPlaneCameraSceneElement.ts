import { DoubleSide, PlaneGeometry } from 'three';
import { SceneElement } from './SceneElement';
import { MeshBasicMaterial } from 'three';
import { Mesh } from 'three';
import { SceneElementOption } from './SceneElementOption';


export class FrontPlaneCameraSceneElement extends SceneElement {
    private color: any;

    constructor(id, color: any, options: SceneElementOption) {
        super(id, options); 
        this.color = color;
    }

    createElement() {
        const geometry = new PlaneGeometry( ...this.scale );
        const material = new MeshBasicMaterial( {color: this.color, side: DoubleSide} );
        const plane = new Mesh( geometry, material ); 
        return plane;
    }
}