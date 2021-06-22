import {Signal} from "../../lib/helpers/Signal";

export enum NOTEBOOK_SEND {
    TOGGLE,
    PAGE,
    CONTENT,
    CLOSE
}

class NotebookSignal {
    private static instance: NotebookSignal;

    public mapDetails: Signal = new Signal();
    public onTabChange: Signal = new Signal();
    public notebookContent: Signal = new Signal();

    private constructor() { }

    public static getInstance(): NotebookSignal {
        if (!NotebookSignal.instance) {
            NotebookSignal.instance = new NotebookSignal();
        }

        return NotebookSignal.instance;
    }

    public tabChange() {
        this.onTabChange.dispatch();
    }

    public sendToNotebook(type: NOTEBOOK_SEND, page:any) {
        this.notebookContent.dispatch(type, page);
    }
}

export default NotebookSignal;
