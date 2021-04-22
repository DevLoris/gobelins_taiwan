import {AudioHandler} from "../lib/audio/AudioHandler";
import {addScenery, getState, store} from "../store/store";
import {selectScene} from "../store/store_selector";

const debug = require("debug")(`front:Game`);

export class Game {

    constructor() {
    }

    public init(): void {
        debug("Init Game");

        // Init audio
        AudioHandler.loadFile();

        // Init sceneries
        this._createSceneries();
    }

    public destroy(): void {

    }

    private _createSceneries() {
        let scene = selectScene("test")(getState().data);
        debug(scene);
        // TODO utilise la data du commit de Loris dans le dossier data
    }
}
