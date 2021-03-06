import {ISequenceStep} from "./SequenceManager";

const debug = require("debug")(`front:SequenceChapterStep`);

export enum EChapterStep {
    INTRO_VLOG = "INTRO_VLOG",
    DIORAMA = "DIORAMA",
    TUTORIAL = "TUTORIAL",
    MAP_UNLOCK = "MAP_UNLOCK",
    OUTRO_VLOG = "OUTRO_VLOG",
}

export class SequenceChapterStep {

    private _identifier:string = "";

    constructor(step: ISequenceStep) {
        debug("SequenceChapterStep init", step.identifier);

        this._identifier = step.identifier;
    }

}
