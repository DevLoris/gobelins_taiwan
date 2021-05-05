import {AudioHandler} from "../lib/audio/AudioHandler";
import {addScenery, getState, store} from "../store/store";
import {selectScene} from "../store/store_selector";
import {SequenceManager} from "./Sequencer/SequenceManager";
import {getChapterAndStepInUrl, isLocal, isUrlDebug} from "../helpers/DebugHelpers";

const debug = require("debug")(`front:Game`);

export class Game {

    constructor() {
    }

    public init(): void {
        debug("Init Game");

        isLocal() && debug("It's a local server!");
        isUrlDebug() && debug("Debug mode enabled!");

        debug(getChapterAndStepInUrl());

        // Init audio
        AudioHandler.loadFile();

        // Init sceneries
        this._initSceneries();
    }

    public destroy(): void {

    }

    private _initSceneries() {

        SequenceManager.instance.init();
        SequenceManager.instance.startFromBeginning();

        // TODO if current sequence step is Vlog, stop animation frame,
        //  if current step is diorama, resume animation frame


        // let scene = selectScene("test")(getState().data);
        // debug("scene", scene);
    }
}
