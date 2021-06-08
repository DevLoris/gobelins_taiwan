import {addScenery, getState, store, vlogIntro, vlogOutro} from "../store/store";
import {selectUserScene} from "../store/store_selector";
import {SequenceManager} from "./Sequencer/SequenceManager";
import {isLocal, isUrlDebug} from "../helpers/DebugHelpers";
import {ERouterPage} from "../routes";
import {Router} from "../lib/router/Router";
import {EChapterStep} from "./Sequencer/SequenceChapterStep";
import {SceneVars} from "../vars/scene_vars";
import {createEmptyScenery} from "../store/store_helper";

const debug = require("debug")(`front:Game`);

export class Game {

    constructor() {
    }

    /**
     * Initialise global game utilities
     */
    public init(): void {
        debug("👾 Init Game");

        isLocal() && debug("It's a local server!");
        isUrlDebug() && debug("Debug mode enabled!");

        // Init scene store
        for(let element in SceneVars) {
            store.dispatch(addScenery(createEmptyScenery(SceneVars[element])));
        }


    }

    /**
     * Destroy instances
     */
    public destroy(): void {

    }


}
