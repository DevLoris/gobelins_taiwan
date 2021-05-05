import {
    IStateDataSceneEffectsType,
    IStateDataSceneCollectibleType,
    IStateDataSceneElementType,
    IStateDataSceneLightType
} from "./state_enums";

export interface IStateData {
    scenes: IStateDataScene[],
    models: IStateDataModel3D[],
    collectibles : IStateDataCollectible[]
}

export interface IStateDataSceneCollectible {
    collectible_id: string
    trigger: string
}

export interface IStateDataScene {
    id: string,
    collectibles: IStateDataSceneCollectible[],
    scene: {
        background: string
    },
    camera: {
        position: ICoord
    },
    orbit: {
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
    value: any
}