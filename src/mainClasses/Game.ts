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

        // Init sequencer
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

        debug("sequenceStepUpdatedHandler", SequenceManager.instance.getCurrentPositionInSequence());

        // Show page related to current step type
        // Is 3d scene
        if(currentStep === EChapterStep.DIORAMA) {
            Router.openPage({page: ERouterPage.WEBGL_PAGE});
        }
        // Is vlog
        else {
            const sceneryIdentifier = SequenceManager.instance.getCurrentChapterSceneFromDiorama();
            const vlogsStates = selectUserScene(sceneryIdentifier)(getState().user_data)?.vlog;
            if(currentStep === EChapterStep.INTRO_VLOG) {
                // If vlog hasn't been seen yet
                if(!vlogsStates?.intro) {
                    // Set vlog as viewed
                    store.dispatch(vlogIntro({bool: true, scene: sceneryIdentifier}));
                    Router.openPage({page: ERouterPage.TRANSITION_PAGE});
                }
                else {
                    // Skip the vlog and go to the diorama
                    SequenceManager.instance.increment();
                    debug(SequenceManager.instance.getCurrentPositionInSequence());
                    Router.openPage({page: ERouterPage.WEBGL_PAGE});
                }
            }
            else if(currentStep === EChapterStep.OUTRO_VLOG) {
                // If vlog hasn't been seen yet
                if(!vlogsStates?.outro) {
                    // Set vlog as viewed
                    store.dispatch(vlogOutro({bool: true, scene: sceneryIdentifier}));
                    Router.openPage({page: ERouterPage.VLOG_PAGE});
                }
                else {
                    // Skip the vlog and increment the game
                    SequenceManager.instance.increment();
                    debug(SequenceManager.instance.getCurrentPositionInSequence());
                    Router.openPage({page: ERouterPage.TRANSITION_PAGE});
                }
            }
        }
    }
}
