import {
    IStateDataSceneEffectsType,
    IStateDataSceneCollectibleType,
    IStateDataSceneElementType,
    IStateDataSceneLightType, IStateDataCollectibleAdditionalDataType, SceneDataAutoMessageMoment
} from "./state_enums";
import {IStateDataAudio} from "./state_interface_data_audio";

export interface IStateData {
    scenes: IStateDataScene[],
    models: IStateDataModel3D[],
    collectibles : IStateDataCollectible[],
    audios: IStateDataAudio[],
}

export interface IStateDataSceneCollectible {
    collectible_id: string
    trigger: string,
    focus?: {
        coords: ICoord,
        rotation: ICoord
    }
}

export interface IStateDataSceneMessage {
    message: string,
    moment: SceneDataAutoMessageMoment,
    delay: number,
}

export interface IStateDataScene {
    id: string,
    name: string,
    chinese_name: string,
    phonetic: string,
    ambient: string,
    collectibles: IStateDataSceneCollectible[],
    messages: IStateDataSceneMessage[]
    map: {
        pin: string,
        x: number,
        y: number
    },
    scene: {
        background: string,
        skybox: {
            posXPath: string,
            negXPath: string,
            posYPath: string,
            negYPath: string,
            posZPath: string,
            negZPath: string
        }
    },
    camera: {
        position: ICoord,
        fov: number
    },
    orbit: {
        enabled: boolean,
        center: ICoord,
        minPolar: number,
        maxPolar: number,
        minDistance: number,
        maxDistance: number,
    },
    content: {
        elements: IStateDataSceneElement[],
        lights: IStateDataSceneLight[],
        effects: IStateDataSceneEffect[],
    }
}

export interface IStateDataSceneElement {
    type: IStateDataSceneElementType,
    id: string,
    gltf?: string,
    color? : string,
    sprite?: string,
    options: any,
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
    stamp: string,
    text: string,
    vlogger?: {
        face: string,
        resolution: string,
    }
    hint?: string,
    hint_audio?:string,
    additional?: IStateDataCollectibleAdditional[]
}
export interface IStateDataCollectibleWithPickup extends IStateDataCollectible {
    pickup: boolean
}

export interface IStateDataCollectibleAdditional {
    type: IStateDataCollectibleAdditionalDataType,
    value: any|string[]|IStateDataCollectibleAdditionalPhonetic,
    credits?: string
}

export interface IStateDataCollectibleAdditionalPhonetic {
    chinese: string,
    phonetic: string,
    english: string
}
