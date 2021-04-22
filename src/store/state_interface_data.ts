export interface IStateData {
    scenes: IStateDataScene[],
    collectibles : IStateDataCollectible[]
}

export interface IStateDataScene {
    id: string,
    collectibles_id: string[],
    camera: {
        position: number[]
    },
    orbit: {
        center: number[],
        minPolar: number,
        maxPolar: number,
        minZoom:  number,
        maxZoom: number,
    },
    content: {
    }
    //  todo complete this
}

export interface IStateDataCollectible {
    id: string,
    name: string,
    asset: string,
    text: string,
    additional?: IStateDataCollectibleAdditional[]
}
export interface IStateDataCollectibleWithPickup extends IStateDataCollectible {
    pickup: boolean
}

export interface IStateDataCollectibleAdditional {
    type: string,
    value: any
}
