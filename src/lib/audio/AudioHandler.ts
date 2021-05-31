import {Howl} from 'howler';
import {IStateDataAudio} from "../../store/state_interface_data_audio";

const debug = require("debug")(`front:Audio`);

export interface IAudio {
    id: string,
    howl: Howl
}

export interface IAudioParams {
    volume?: number,
    loop?: boolean
}

export class AudioHandler {
    static audioList: IAudio[] = [];

    static loadAll(audios:  IStateDataAudio[]) {
        audios.forEach(value => AudioHandler.load(value.id, value.url, value.params));
    }

    static load(id, path, params: IAudioParams) {
        AudioHandler.audioList.push({
            id: id,
            howl: new Howl({
                src: [path],
                ...params
            })
        })
    }

    static play(id) {
        this.audioList.find(value => value.id == id)?.howl.play();
    }

    static get(id) {
        return this.audioList.find(value => value.id == id)?.howl;
    }

    static stop(id) {
        this.audioList.find(value => value.id == id)?.howl.stop();
    }
}
