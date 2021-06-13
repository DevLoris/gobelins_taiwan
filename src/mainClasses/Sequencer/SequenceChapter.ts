import {SequenceChapterStep} from "./SequenceChapterStep";
import {EChapterName, ISequenceChapter} from "./SequenceManager";

const debug = require("debug")(`front:SequenceChapter`);

export class SequenceChapter {

    private readonly _identifier:EChapterName;
    get identifier():EChapterName {
        return this._identifier;
    }

    private _steps = new Array<SequenceChapterStep>();

    constructor(chapterData: ISequenceChapter) {
        debug("SequenceChapter init ", chapterData.name);

        this._identifier = chapterData.name;

        for(let i = 0 ; i < chapterData.steps.length ; i++) {
            this._steps.push(new SequenceChapterStep(chapterData.steps[i]));
        }
    }
}
