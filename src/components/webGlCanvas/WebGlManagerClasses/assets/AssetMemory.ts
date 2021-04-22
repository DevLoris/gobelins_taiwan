import {AssetLoader} from "./AssetLoader";
import {AssetGLTF} from "./AssetGLTF";
import {store} from "../../../../store/store";
import {IStateDataModel3D} from "../../../../store/state_interface_data";

const debug = require("debug")(`front:AssetMemory`);

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

    public async loadAll(modelsList: IStateDataModel3D[]) {
        return Promise.all(modelsList.map((model) => {
            return this.load(model.id, model.path);
        }));
    }

    public async load(id: string, path: string): Promise<AssetGLTF> {
        let asset : AssetGLTF = new AssetGLTF(id, path);
        AssetMemory.instance.__assets.push(asset);
        return await asset.triggerLoad(AssetMemory.instance.__loader);
    }

    public get(id: string) {
        return this.__assets.find(v => v.id === id);
    }
}
