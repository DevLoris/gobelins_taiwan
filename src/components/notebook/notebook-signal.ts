import {Signal} from "../../lib/helpers/Signal";
import {NotebookPages} from "./Notebook";

export enum NOTEBOOK_SEND {
    TOGGLE,
    PAGE,
    CONTENT,
}

class NotebookSignal {
    private static instance: NotebookSignal;

    public onToggle: Signal = new Signal();
    public notebookContent: Signal = new Signal();

    private constructor() { }

    public static getInstance(): NotebookSignal {
        if (!NotebookSignal.instance) {
            NotebookSignal.instance = new NotebookSignal();
        }

        return NotebookSignal.instance;
    }

    public toggle(status:boolean) {
        this.onToggle.dispatch(status);
    }

    public sendToNotebook(type: NOTEBOOK_SEND, page:any) {
        this.notebookContent.dispatch(type, page);
    }
}

export default NotebookSignal;
