import {SequenceChapter} from "./SequenceChapter";
import {EChapterStep} from "./SequenceChapterStep";
import {getChapterAndStepInUrl} from "../../helpers/DebugHelpers";
import {Signal} from "../../lib/helpers/Signal";

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
    name: string,
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

// TODO mettre dans les data lol
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
                sceneId: "test"
            },
            {
                identifier: EChapterStep.OUTRO_VLOG,
                id: "opening"
            },
        ]
    },
];

// Nombre de séquences totales dans le jeu
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

    // ---------------------------------------------------------------------------

    /**
     * Check if debug data is in url
     * or check if saved data is in localstorage
     * or start from beginning
     */
    public init(): void {
        debug("SequenceManager init", CHAPTERS);

        const fromUrl = getChapterAndStepInUrl()
        debug("URL", fromUrl);

        // Get debug chapter & step from url
        if( fromUrl[0] && fromUrl[1] ) {
            CHAPTERS.forEach((chapter, chapterIndex) => {
                if(chapter.name === fromUrl[0]) {
                    this.activeChapterName = EChapterName[fromUrl[0]];
                    this._activeChapterIndex = chapterIndex;
                    chapter.steps.forEach((step, stepIndex) => {
                        if(step.identifier === fromUrl[1]) {
                            this.activeStepName = fromUrl[1];
                            this._activeStepIndex = stepIndex;
                            debug("identifier", step.identifier);
                        }
                    });
                }
            });
        }

        //  checker dans le localstorage si il y a une sauvegarde

        // Start at the beginning
        else {
            this.startFromBeginning();
        }
    }

    /**
     * Set indexes to 0, start from the beginning
     */
    public startFromBeginning(): void {
        this.activeChapterName = EChapterName[CHAPTERS[0].name];
        this._activeChapterIndex = 0;
        this.activeStepName = CHAPTERS[0].steps[0].identifier;
        this._activeStepIndex = 0;
    }

    /**
     * Get names of current chapter ans step
     * return [activeChapterName: string, activeStepName: string]
     */
    public getCurrentPositionInSequence(): [string, string] {
        if(this.activeChapterName === undefined || this.activeStepName === undefined) this.startFromBeginning();
        return [this.activeChapterName, this.activeStepName];
    }

    /**
     * If current step is diorama, return the name of the scenery
     */
    public getCurrentSceneId(): string {
        return CHAPTERS[this._activeChapterIndex].steps[this._activeStepIndex].sceneId;
    }

    /**
     * Step forward in sequence
     */
    public increment(): void {
        // If there is one more step inside this chapter
        if(CHAPTERS[this._activeChapterIndex].steps[this._activeStepIndex+1]) {
            this._activeStepIndex += 1;
            this.activeStepName = CHAPTERS[this._activeChapterIndex].steps[this._activeStepIndex].identifier;
        }
        // Else jump to next chapter
        else {
            // Check if next chapter exists
            if(!CHAPTERS[this._activeChapterIndex + 1]) {
                console.error("Cannot switch to next chapter: current is last on list");
                return;
            }

            this._activeChapterIndex += 1;
            this._activeStepIndex = 0;

            this.activeChapterName = EChapterName[CHAPTERS[this._activeChapterIndex].name];
            this.activeStepName = CHAPTERS[this._activeChapterIndex].steps[this._activeStepIndex].identifier;
        }
    }
}
