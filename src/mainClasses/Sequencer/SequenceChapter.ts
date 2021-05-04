import {SequenceChapterStep} from "./SequenceChapterStep";
import {EChapterName} from "./SequenceManager";

const debug = require("debug")(`front:SequenceChapter`);

export class SequenceChapter {

    private readonly _identifier:EChapterName;
    get identifier():EChapterName {
        return this._identifier;
    }

    private _steps = new Array<SequenceChapterStep>();

    // TODO typage
    constructor(chapterData: any) {
        // debug("SequenceChapter init ", chapterData.name);

        this._identifier = chapterData.identifier;

        for(let i = 0 ; i < chapterData.steps.length ; i++) {
            this._steps.push(new SequenceChapterStep(chapterData.steps[i]));
        }
    }
}
