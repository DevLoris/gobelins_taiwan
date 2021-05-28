export interface IStateDataAudio {
    id: string,
    url: string,
    params: IStateDataAudioParams
}

export interface IStateDataAudioParams {
    volume?: number,
    loop?: boolean
}
