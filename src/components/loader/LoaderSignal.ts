import {Signal} from "../../lib/helpers/Signal";

class LoaderSignal {
    private static instance: LoaderSignal;

    public beforeLoad: Signal = new Signal();

    private constructor() { }

    public static getInstance(): LoaderSignal {
        if (!LoaderSignal.instance) {
            LoaderSignal.instance = new LoaderSignal();
        }

        return LoaderSignal.instance;
    }

    public loaded(name:string) {
        this.beforeLoad.dispatch(name);
    }
}

export default LoaderSignal;
