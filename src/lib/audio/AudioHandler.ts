import {Howl, Howler} from 'howler';
import audio from '../../data/audio.json';
console.log(audio);

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

    static loadFile() {
        audio.forEach((value : {id: string, url: string, params: IAudioParams}) => {
            AudioHandler.load(value.id, value.url, value.params);
        })
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

    static stop(id) {
        this.audioList.find(value => value.id == id)?.howl.stop();
    }
}