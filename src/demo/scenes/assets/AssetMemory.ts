import {AssetLoader} from "./AssetLoader";
import {AssetGLTF} from "./AssetGLTF";


export class AssetMemory {
    static loader: AssetLoader = new AssetLoader();
    static assets: AssetGLTF[];

    static load(id: string, path: string) {
        let asset : AssetGLTF = new AssetGLTF(id, path);
        AssetMemory.assets.push(asset);
        asset.load(AssetMemory.loader);
    }
}