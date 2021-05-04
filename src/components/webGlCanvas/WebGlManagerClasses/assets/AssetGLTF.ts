import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {AssetLoader} from "./AssetLoader";
import {DEFAULT_SCALE_FACTOR} from "../WebGlVars";

const debug = require("debug")(`front:AssetGLTF`);

export class AssetGLTF {
    public loaded:  boolean = false;
    public loading_progress: number = 0;
    public id: string =  null;
    public path: string =  null;
    public gltf: GLTF;

    constructor(id, path) {
        this.id = id;
        this.path = path;
    }

    async triggerLoad(assetLoader: AssetLoader):Promise<any> {
        return assetLoader.getGltfLoader()
            .loadAsync(this.path, (e: ProgressEvent) => {})
            .then(gltf => {
                const model = gltf.scene;
                model.position.set( 0, 0, 0 );
                model.scale.set( DEFAULT_SCALE_FACTOR, DEFAULT_SCALE_FACTOR, DEFAULT_SCALE_FACTOR );

                gltf.scene.traverse( child => {
                    // @ts-ignore
                    if ( child.material ) child.material.metalness = 0;
                } );

                this.loaded  = true;
                this.gltf = gltf;
                return this;
            });
    }
}
