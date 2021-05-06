import {SequenceChapter} from "./SequenceChapter";
import {EChapterStep} from "./SequenceChapterStep";
import {getChapterAndStepInUrl} from "../../helpers/DebugHelpers";
import {Signal} from "../../lib/helpers/Signal";

const debug = require("debug")(`front:SequenceManager`);

export enum EChapterName {
    INTRO_VLOG = "INTRO_VLOG",
    FIRST_ENIGMA = "FIRST_ENIGMA",
    SECOND_ENIGMA = "SECOND_ENIGMA",
    OUTRO_VLOG = "OUTRO_VLOG"
}

// TODO mettre dans les data lol
export const CHAPTERS = [
    {
        name: EChapterName.FIRST_ENIGMA,
        steps: [
            {
                identifier: EChapterStep.INTRO_VLOG,
                id: "opening", // TODO changer pour la démo
            },
            {
                identifier: EChapterStep.DIORAMA,
                id: "centreVilleWesh"
            },
            {
                identifier: EChapterStep.OUTRO_VLOG,
                id: "opening" // TODO changer pour la démo
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

    private _chapters = new Array<SequenceChapter>();

    private _activeChapterName: EChapterName = null;
    get activeChapterName(): EChapterName {
        return this._activeChapterName;
    }
    set activeChapterName(name:EChapterName) {
        this._activeChapterName = name;
    }

    private _activeStepName: EChapterStep = null;
    get activeStepName(): EChapterStep {
        return this._activeStepName;
    }
    set activeStepName(name: EChapterStep) {
        this._activeStepName = name;
        this._onStepUpdated.dispatch();
    }

    protected _onStepUpdated: Signal = new Signal();
    public get onStepUpdated(): Signal {
        return this._onStepUpdated;
    }

    public init(): void {
        debug("SequenceManager init", CHAPTERS);

        for(let i = 0; i < SEQUENCE_COUNT; i++) {
            this._chapters.push(new SequenceChapter(CHAPTERS[i]));
        }

        const fromUrl = getChapterAndStepInUrl()

        debug("URL", fromUrl);

        // Get debug chapter & step from url
        if( fromUrl[0] && fromUrl[1] ) {
            CHAPTERS.forEach((chapter) => {
                if(chapter.name === fromUrl[0]) {
                    this.activeChapterName = fromUrl[0];
                    chapter.steps.forEach((step) => {
                        if(step.identifier === fromUrl[1]) {
                            this.activeStepName = fromUrl[1];
                            debug("identifier", step.identifier);
                        }
                    });
                }
            });
        }
        else {
            this.startFromBeginning();
        }


        // TODO checker dans le localstorage si il y a une sauvegarde
        // TODO sinon démarrer du début
    }

    public startFromBeginning(): void {
        this.activeChapterName = CHAPTERS[0].name;
        this.activeStepName = CHAPTERS[0].steps[0].identifier;
    }

    public getCurrentPositionInSequence(): [string, string] {
        return [this.activeChapterName, this.activeStepName];
    }

    public increment(): void {

    }
}
