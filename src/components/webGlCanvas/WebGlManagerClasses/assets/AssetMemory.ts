import {AssetLoader} from "./AssetLoader";
import {AssetGLTF} from "./AssetGLTF";

export class AssetMemory {
    // --------------------------------------------------------------------------- SINGLETON

    /**
     * Create an instance if it doesn't already exist when instance method
     */
    protected static __instance: AssetMemory;

    static get instance(): AssetMemory {
        if (this.__instance == null) this.__instance = new AssetMemory();
        return this.__instance;
    }

    // ---------------------------------------------------------------------------

    private __loader: AssetLoader = new AssetLoader();
    private __assets: AssetGLTF[] = [];

    public load(id: string, path: string) {
        let asset : AssetGLTF = new AssetGLTF(id, path);
        AssetMemory.instance.__assets.push(asset);
        asset.load(AssetMemory.instance.__loader);
        return asset;
    }
}
