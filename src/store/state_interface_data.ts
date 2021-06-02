import {
    IStateDataSceneEffectsType,
    IStateDataSceneCollectibleType,
    IStateDataSceneElementType,
    IStateDataSceneLightType
} from "./state_enums";
import {IStateDataAudio} from "./state_interface_data_audio";

export interface IStateData {
    scenes: IStateDataScene[],
    models: IStateDataModel3D[],
    collectibles : IStateDataCollectible[],
    audios: IStateDataAudio[]
}

export interface IStateDataSceneCollectible {
    collectible_id: string
    trigger: string,
    focus?: {
        coords: ICoord,
        rotation: ICoord
    }
}

export interface IStateDataScene {
    id: string,
    name: string,
    chinese_name: string,
    phonetic: string,
    ambient: string,
    collectibles: IStateDataSceneCollectible[],
    scene: {
        background: string
    },
    camera: {
        position: ICoord
    },
    orbit: {
        enabled: boolean,
        center: ICoord,
        minPolar: number,
        maxPolar: number,
        minDistance:  number,
        maxDistance: number,
    },
    content: {
        elements: IStateDataSceneElement[],
        lights: IStateDataSceneLight[],
        effects: IStateDataSceneEffect[],
    }
    //  todo complete this
}

export interface IStateDataSceneElement {
    type: IStateDataSceneElementType,
    id: string,
    gltf?: string,
    color? : string,
    options: any
}

export interface IStateDataSceneLight {
    type: IStateDataSceneLightType,
    color?: string,
    groundColor?: string,
    intensity?: number,
    coords?: ICoord
}

export interface IStateDataSceneEffect {
    type: IStateDataSceneEffectsType;
}


export interface ICoord {
    x: number,
    y: number,
    z: number
}

export interface IStateDataModel3D {
    id:string,
    path: string,
}

export interface IStateDataCollectible {
    id: string,
    type: IStateDataSceneCollectibleType,
    name: string,
    asset: string,
    text: string,
    hint?: string,
    additional?: IStateDataCollectibleAdditional[]
}
export interface IStateDataCollectibleWithPickup extends IStateDataCollectible {
    pickup: boolean
}

export interface IStateDataCollectibleAdditional {
    type: string,
    value: any|string[],
    credits?: string
}
