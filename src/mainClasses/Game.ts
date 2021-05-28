import {AudioHandler} from "../lib/audio/AudioHandler";
import {addScenery, getState, store} from "../store/store";
import {selectScene} from "../store/store_selector";
import {SequenceManager} from "./Sequencer/SequenceManager";
import {getChapterAndStepInUrl, isLocal, isUrlDebug} from "../helpers/DebugHelpers";
import {ERouterPage} from "../routes";
import {Router} from "../lib/router/Router";
import {EChapterStep} from "./Sequencer/SequenceChapterStep";
import {WebGlManager} from "../components/webGlCanvas/WebGlManagerClasses/WebGlManager";
import {DEFAULT_SCENE} from "../vars/scene_vars";

const debug = require("debug")(`front:Game`);

export class Game {

    constructor() {
    }

    /**
     * Initialise global game utilities
     */
    public init(): void {
        debug("Init Game");

        isLocal() && debug("It's a local server!");
        isUrlDebug() && debug("Debug mode enabled!");

        // Init audio
        AudioHandler.loadFile();

        // Init sceneries
        this._initSceneries();

        SequenceManager.instance.onStepUpdated.add(this.sequenceStepUpdatedHandler);
        SequenceManager.instance.init();
    }

    /**
     * Destroy instances
     */
    public destroy(): void {
        SequenceManager.instance.onStepUpdated.remove(this.sequenceStepUpdatedHandler);
    }

    /**
     * On sequence updated
     */
    public sequenceStepUpdatedHandler() {

        // Get current step
        const currentStep = SequenceManager.instance.getCurrentPositionInSequence()[1];

        // Show page related to current step type
        // Is 3d scene
        if(currentStep === EChapterStep.DIORAMA) {
            Router.openPage({page: ERouterPage.WEBGL_PAGE});
        }
        // Is video
        else {
            Router.openPage({page: ERouterPage.VLOG_PAGE});
        }
    }

    private _initSceneries() {


        // let scene = selectScene("test")(getState().data);
        // debug("scene", scene);
    }
}
