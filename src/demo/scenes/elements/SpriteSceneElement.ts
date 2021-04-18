import { BoxGeometry, Mesh, MeshBasicMaterial, Sprite, SpriteMaterial, TextureLoader } from "three";
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
        const material = new SpriteMaterial( { map: map } );
        const sprite = new Sprite( material ); 
        return sprite;
    }
}