import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {AssetGLTF} from "./AssetGLTF";

export class AssetLoader {
    private _draco_loader : DRACOLoader = new DRACOLoader();
    public _gltf_loader : GLTFLoader = new GLTFLoader();

    constructor() {
        this._draco_loader.setDecoderPath("/public/decoder/");
        this._draco_loader.preload();

        this._gltf_loader.setDRACOLoader( this._draco_loader );
    }

    public getGlftLoader() {
        return  this._gltf_loader;
    }
}