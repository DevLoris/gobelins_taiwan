import { BackSide } from 'three';
import { CubeSceneElement } from './CubeSceneElement';
import { MeshBasicMaterial } from 'three';
import { Mesh } from 'three';

export class CubeOutlinedSceneElement extends CubeSceneElement{
    private outline_color: any;
    private outline_width: number;

    constructor(id, size, position, color: any, outline_color: any, outline_width: number) {
        super(id, size, position, color); 
        this.outline_color = outline_color;
        this.outline_width = outline_width;
    }
 

    prepareElements() {
        let actualElements = super.prepareElements();

        var outlineMaterial = new MeshBasicMaterial( { color: this.outline_color, side: BackSide } );
        var outlineMesh = new Mesh( actualElements[0].geometry, outlineMaterial );
        outlineMesh.position.set(...this.position);
        outlineMesh.scale.multiplyScalar(this.outline_width);

        actualElements.push(outlineMesh);

        return actualElements;
    }
}