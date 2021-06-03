import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, Sprite, SpriteMaterial, TextureLoader } from "three";
import { SceneElement } from "./SceneElement";
import { SceneElementOption } from "./SceneElementOption";
export class SpriteSceneElement extends SceneElement {
    private path: any;

    constructor(id, path: any, options: SceneElementOption) {
        super(id, options);
        this.path = path;
    }

    createElement() {
        const map = new TextureLoader().load( this.path );

        const geometry = new PlaneGeometry( 1, 1);
        const material = new MeshBasicMaterial( { map, transparent: true, side: DoubleSide, } );
        const plane = new Mesh(geometry, material);
        plane.scale.set(...this.scale);
        return plane;
    }
}
