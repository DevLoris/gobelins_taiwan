import { DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, TextureLoader } from "three";
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
        const geometry = new PlaneGeometry(1, 1);
        const material = new MeshStandardMaterial( { map, transparent: true, side: DoubleSide } );
        material.metalness = 1;
        const plane = new Mesh(geometry, material);
        plane.userData = {sprite: true};
        plane.scale.set(this.scale[0], this.scale[1] * (this.size.h / this.size.w), this.scale[2]);
        plane.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);

        // custom data
        plane.userData.sprite = true;

        return plane;
    }
}
