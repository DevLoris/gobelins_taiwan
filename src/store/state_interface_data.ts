export interface IStateData {
    scenes: IStateDataScene[],
    collectibles : IStateDataCollectible[]
}

export interface IStateDataScene {
    id: string,
    collectibles_id: string[],
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
    }
    //  todo complete this
}

export interface ICoord {
    x: number,
    y: number,
    z: number
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
