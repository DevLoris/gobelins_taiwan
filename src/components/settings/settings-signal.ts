import {Signal} from "../../lib/helpers/Signal";

export enum SETTINGS_SEND {
    TOGGLE,
    SAVE
}

class SettingsSignal {
    private static instance: SettingsSignal;

    public onToggle: Signal = new Signal();
    public settingsContent: Signal = new Signal();

    public static getInstance(): SettingsSignal {
        if (!SettingsSignal.instance) {
            SettingsSignal.instance = new SettingsSignal();
        }

        return SettingsSignal.instance;
    }

    public toggle(status:boolean) {
        this.onToggle.dispatch(status);
    }
}

export default SettingsSignal;
