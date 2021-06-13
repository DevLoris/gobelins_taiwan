import {EChapterStep} from "./SequenceChapterStep";
import {getChapterAndStepInUrl} from "../../helpers/DebugHelpers";
import {Signal} from "../../lib/helpers/Signal";
import {SceneVars} from "../../vars/scene_vars";
import {selectUserActiveScene, selectUserScene} from "../../store/store_selector";
import {getState} from "../../store/store";

const debug = require("debug")(`front:SequenceManager`);

/**
 * An EChapterName is the type of the current sequence chapter
 * Chapter != Step
 * A chapter has steps inside it (see ISequenceChapter)
 */
export enum EChapterName {
    INTRO_VLOG = "INTRO_VLOG",
    FIRST_ENIGMA = "FIRST_ENIGMA",
    SECOND_ENIGMA = "SECOND_ENIGMA",
    OUTRO_VLOG = "OUTRO_VLOG"
}

/**
 * Chapter data
 */
export interface ISequenceChapter {
    name: EChapterName,
    steps: ISequenceStep[],
}

/**
 * Chapter step data
 */
export interface ISequenceStep {
    identifier: EChapterStep,
    id: string,
    sceneId?: string
}

export const CHAPTERS: ISequenceChapter[] = [
    {
        name: EChapterName.FIRST_ENIGMA,
        steps: [
            {
                identifier: EChapterStep.INTRO_VLOG,
                id: "loris",
            },
            {
                identifier: EChapterStep.DIORAMA,
                id: "centreVilleWesh",
                sceneId: SceneVars.TAIPEI
            },
            {
                identifier: EChapterStep.OUTRO_VLOG,
                id: "opening"
            },
        ]
    },
    {
        name: EChapterName.SECOND_ENIGMA,
        steps: [
            {
                identifier: EChapterStep.INTRO_VLOG,
                id: "loris",
            },
            {
                identifier: EChapterStep.DIORAMA,
                id: "sceneTwo",
                sceneId: SceneVars.WILD
            },
            {
                identifier: EChapterStep.OUTRO_VLOG,
                id: "opening"
            },
        ]
    },
];

// Nombre de chapitres dans le jeu
const SEQUENCE_COUNT = CHAPTERS.length;

export class SequenceManager {

    // --------------------------------------------------------------------------- SINGLETON

    /**
     * Create an instance if it doesn't already exist when instance method
     */
    protected static __instance: SequenceManager;

    static get instance(): SequenceManager {
        if (this.__instance == null) this.__instance = new SequenceManager();
        return this.__instance;
    }

    // ---------------------------------------------------------------------------

    /**
     * Contains the active chapter name
     * @private
     */
    private _activeChapterName: EChapterName = null;
    get activeChapterName(): EChapterName {
        return this._activeChapterName;
    }
    set activeChapterName(name:EChapterName) {
        this._activeChapterName = name;
    }

    /**
     * The active chapter index in chapter array
     * @private
     */
    private _activeChapterIndex:number = 0;

    /**
     * Contains the active step name in current chapter
     * Setter triggers onStepUpdated() Signal
     * @private
     */
    private _activeStepName: EChapterStep = null;
    get activeStepName(): EChapterStep {
        return this._activeStepName;
    }
    set activeStepName(name: EChapterStep) {
        this._activeStepName = name;
        // Trigger onStepUpdated() signal
        this.onStepUpdated.dispatch();
    }

    /**
     * Used to indicate that the current step has been modified
     * @protected
     */
    protected _onStepUpdated: Signal = new Signal();
    public get onStepUpdated(): Signal {
        return this._onStepUpdated;
    }

    /**
     * The active step index in the current chapter
     * @private
     */
    private _activeStepIndex:number = 0;
    get activeStepIndex(): number {
        return this._activeStepIndex;
    }
    set activeStepIndex(index: number) {
        this._activeStepIndex = index;
        debug("New active step index is", this.activeStepIndex);
    }

    /**
     * The active video ID, if the current step is vlog
     * @private
     */
    private _activeVideoId: string = "";
    get activeVideoId(): string {
        return this._activeVideoId;
    }
    set activeVideoId(id:string) {
        this._activeVideoId = id;
    }

    // ---------------------------------------------------------------------------

    /**
     * Check if debug data is in url
     * or check if saved data is in localstorage
     * or start from beginning
     */
    public init(): void {
        debug("SequenceManager init chapters:", CHAPTERS);

        const fromUrl = getChapterAndStepInUrl()
        debug("URL", fromUrl);

        const sceneryIdentifier = SequenceManager.instance.getCurrentChapterSceneFromDiorama();
        const vlogsStates = selectUserScene(sceneryIdentifier)(getState().user_data)?.vlog;

        // Get debug chapter & step from url
        if( fromUrl?.[0] && fromUrl?.[1] ) {
            CHAPTERS.forEach((chapter, chapterIndex) => {
                if(chapter.name === fromUrl[0]) {
                    this.activeChapterName = EChapterName[fromUrl[0]];
                    this._activeChapterIndex = chapterIndex;
                    chapter.steps.forEach((step, stepIndex) => {
                        if(step.identifier === fromUrl[1]) {
                            this.activeStepName = fromUrl[1];
                            this.activeStepIndex = stepIndex;
                        }
                    });
                }
            });
        }
        // Start at the beginning
        else if(!vlogsStates?.intro) {
            this.startFromBeginning();
        }
        // Get data from save
        else {
            debug("Get data from save", selectUserScene(sceneryIdentifier)(getState().user_data));
            this.setPositionsFromStore(selectUserActiveScene(getState()));
            debug("Position is now", this.getCurrentPositionInSequence());
        }
    }

    /**
     * Set indexes to 0, start from the beginning
     */
    public startFromBeginning(): void {
        debug("start from beginning");
        this.activeChapterName = EChapterName[CHAPTERS[0].name];
        this._activeChapterIndex = 0;
        this.activeStepName = CHAPTERS[0].steps[0].identifier;
        this.activeStepIndex = 0;
    }

    /**
     * Get names of current chapter and step
     * return [activeChapterName: string, activeStepName: string]
     */
    public getCurrentPositionInSequence(): [string, string] {
        // if(this.activeChapterName === undefined || this.activeStepName === undefined) this.startFromBeginning();
        return [this.activeChapterName, this.activeStepName];
    }

    /**
     * If current step is diorama, return the name of the scenery
     */
    public getCurrentSceneId(): string {
        const sceneId = CHAPTERS[this._activeChapterIndex].steps[this.activeStepIndex].sceneId;
        debug("getCurrentSceneId()", sceneId);
        if(sceneId === undefined) console.error("Scene ID is undefined. Maybe the current step is not diorama");
        return sceneId;
    }

    /**
     * Get scene id from current chapter
     * @return string
     */
    public getCurrentChapterSceneFromDiorama(): string {
        let sceneId = "";
        CHAPTERS[this._activeChapterIndex].steps.map((step) => {
            if(step.identifier === EChapterStep.DIORAMA) {
                sceneId = step.sceneId;
            }
        });
        return sceneId;
    }

    /**
     * Get the video ID of the last or current vlog
     */
    public getCurrentVideoId(): string {
        if(!CHAPTERS[this._activeChapterIndex].steps[this.activeStepIndex]?.id) {
            console.error("No video for current step");
        }
        return CHAPTERS[this._activeChapterIndex].steps[this.activeStepIndex].id;
    }

    /**
     * Set position params in object, from saved data
     * @param sceneId
     * @private
     */
    private setPositionsFromStore(sceneId: string) {
        CHAPTERS.forEach((chapter, chapterIndex) => {
                chapter.steps.forEach((step, stepIndex) => {
                    // Set current step as diorama scene
                    if( step?.sceneId && step.sceneId === sceneId ) {
                        this.activeChapterName = EChapterName[CHAPTERS[chapterIndex].name];
                        this._activeChapterIndex = chapterIndex;
                        this.activeStepName = step.identifier;
                        this.activeStepIndex = stepIndex;

                        const scenePickupState = selectUserScene(sceneId)(getState().user_data)?.hint?.pickup;

                        // If main element has been picked, increment
                        if(scenePickupState) {
                            this.increment();
                        }
                    }
                });
        });
    }

    /**
     * Step forward in sequence
     */
    public increment(): void {
        debug("Increment sequence. Current step:", this.getCurrentPositionInSequence());
        // If there is one more step inside this chapter
        if(CHAPTERS[this._activeChapterIndex].steps[this.activeStepIndex+1]) {
            debug("Switching to next step");
            this.activeStepIndex += 1;
            this.activeStepName = CHAPTERS[this._activeChapterIndex].steps[this.activeStepIndex].identifier;
            debug("new step is", this.activeStepName);
        }
        // Else jump to next chapter
        else {
            // Check if next chapter exists
            if(!CHAPTERS[this._activeChapterIndex + 1]) {
                console.error("Cannot switch to next chapter: current is last on list");
                return;
            }

            debug("Switching to next chapter");

            this._activeChapterIndex += 1;
            this.activeChapterName = EChapterName[CHAPTERS[this._activeChapterIndex].name];
            this.activeStepIndex = 0;
            this.activeStepName = CHAPTERS[this._activeChapterIndex].steps[this.activeStepIndex].identifier;
            debug("current chapter is", this.activeChapterName, "and current step is", this.activeStepName);
        }
    }
}
