import {Signal} from "../../lib/helpers/Signal";

class NotebookSignal {
    private static instance: NotebookSignal;

    public onToggle: Signal = new Signal();

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
}

export default NotebookSignal;
