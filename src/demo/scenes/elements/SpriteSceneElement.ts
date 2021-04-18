import { BoxGeometry, Mesh, MeshBasicMaterial, Sprite, SpriteMaterial, TextureLoader } from "three";
import { SceneElement } from "./SceneElement"; 
export class SpriteSceneElement extends SceneElement {
    private path: any;

    constructor(id, size, position, path: any) {
        super(id, size, position); 
        this.path = path;
    }

    prepareElements() {
        const map = new TextureLoader().load( this.path );
        const material = new SpriteMaterial( { map: map } );
        const sprite = new Sprite( material );
        sprite.position.set(...this.position);
        sprite.renderOrder = 999;
        sprite.onBeforeRender = function( renderer ) { renderer.clearDepth(); };

        return [sprite];
    }
}