import {SequenceChapter} from "./SequenceChapter";
import {EChapterStep} from "./SequenceChapterStep";

const debug = require("debug")(`front:SequenceManager`);

export enum EChapterName {
    INTRO_VLOG = "INTRO_VLOG",
    FIRST_ENIGMA = "FIRST_ENIGMA",
    SECOND_ENIGMA = "SECOND_ENIGMA",
    OUTRO_VLOG = "OUTRO_VLOG"
}

export const CHAPTERS = [
    {
        name: EChapterName.FIRST_ENIGMA,
        steps: [
            {
                identifier: EChapterStep.INTRO_VLOG,
            },
            {
                identifier: EChapterStep.DIORAMA,
            },
            {
                identifier: EChapterStep.OUTRO_VLOG,
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

    public init(): void {
        debug("SequenceManager init", CHAPTERS);

        for(let i = 0; i < SEQUENCE_COUNT; i++) {
            this._chapters.push(new SequenceChapter(CHAPTERS[i]));
        }

        // TODO checker dans le localstorage si il y a une sauvegarde
        this._activeChapterName = this._chapters[0].identifier;
    }

    public startFromBeginning(): void {
        this._activeChapterName = CHAPTERS[0].name;
    }

    // TODO typage
    public getCurrentPositionInSequence(): any {

    }

    public increment(): void {

    }
}
