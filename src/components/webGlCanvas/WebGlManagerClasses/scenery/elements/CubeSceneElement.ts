import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { SceneElement } from "./SceneElement";
import { SceneElementOption } from "./SceneElementOption";

export class CubeSceneElement extends SceneElement {
    private color: any;

    constructor(id, color: any, options: SceneElementOption) {
        super(id, options); 
        this.color = color;
    }

    createElement() {
        const geometry = new BoxGeometry( ...this.size );
        const material = new  MeshBasicMaterial( {color: this.color} );
        const cube = new Mesh( geometry, material ); 
        return cube;
    } 
}