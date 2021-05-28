import {getState} from "../store/store";
import {selectScene} from "../store/store_selector";
import {DEFAULT_SCENE} from "../vars/scene_vars";

const debug = require("debug")(`front:Game`);

export class Game {

    constructor() {
    }

    public init(): void {
        debug("Init Game");

        // Init sceneries
        this._initSceneries();
    }

    public destroy(): void {

    }

    private _initSceneries() {
        let scene = selectScene(DEFAULT_SCENE)(getState().data);
        debug(scene);
    }
}
