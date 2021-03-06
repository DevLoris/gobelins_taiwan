import {Howl, Howler} from 'howler';
import {IStateDataAudio} from "../../store/state_interface_data_audio";
import {AUDIO_LEVEL} from "../../vars/scene_vars";

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
        Howler.volume(AUDIO_LEVEL);
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

    static stopAll() {
        this.audioList.forEach((sound) => {
            sound.howl.stop();
        });
    }
}
