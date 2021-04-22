import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {AssetLoader} from "./AssetLoader";

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

    load(assetLoader: AssetLoader) {
        assetLoader.getGlftLoader().load( this.path,
            ( gltf )  => {
                const model = gltf.scene;
                model.position.set( 1, 1, 0 );
                model.scale.set( 0.01, 0.01, 0.01 );

                this.loaded  = true;
                this.gltf = gltf;
            },
            ( xhr ) =>  {
                this.loading_progress =  ( xhr.loaded / xhr.total * 100 ) ;
            },
            ( e ) => {
                this.loaded  = false;
                console.error( e );
            }
        );
    }
}
