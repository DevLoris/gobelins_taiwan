import {AudioHandler} from "../lib/audio/AudioHandler";
import {addScenery, getState, store} from "../store/store";
import {selectScene} from "../store/store_selector";
import {SequenceManager} from "./Sequencer/SequenceManager";

const debug = require("debug")(`front:Game`);

export class Game {

    constructor() {
    }

    public init(): void {
        debug("Init Game");

        // Init audio
        AudioHandler.loadFile();

        // Init sceneries
        this._initSceneries();
    }

    public destroy(): void {

    }

    private _initSceneries() {

        SequenceManager.instance.init();

        // TODO if current sequence step is Vlog, stop animation frame,
        //  if current step is diorama, resume animation frame


        // let scene = selectScene("test")(getState().data);
        // debug("scene", scene);
    }
}
