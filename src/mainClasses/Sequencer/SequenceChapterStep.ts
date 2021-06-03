const debug = require("debug")(`front:SequenceChapterStep`);

export enum EChapterStep {
    INTRO_VLOG = "INTRO_VLOG",
    DIORAMA = "DIORAMA",
    OUTRO_VLOG = "OUTRO_VLOG",
}

export class SequenceChapterStep {

    private _identifier:string = "";

    // TODO typage
    constructor(step:any) {
        debug("SequenceChapterStep init", step.identifier);

        this._identifier = step.identifier;
    }

}
