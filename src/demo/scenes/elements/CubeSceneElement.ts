import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { SceneElement } from "./SceneElement";

export class CubeSceneElement extends SceneElement {
    private color: any;

    constructor(id, size, position, color: any) {
        super(id, size, position); 
        this.color = color;
    }

    prepareElements() {
        const geometry = new BoxGeometry( ...this.size );
        const material = new  MeshBasicMaterial( {color: this.color} );
        const cube = new Mesh( geometry, material ); 
        cube.position.set(...this.position);

        return [cube];
    }
}