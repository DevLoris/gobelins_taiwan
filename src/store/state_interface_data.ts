export interface IStateData {
    scenes: IStateDataScene[],
    collectibles : IStateDataCollectible[]
}

export interface IStateDataScene {
    id: string,
    collectibles_id: string[]
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
}

export interface IStateDataCollectibleAdditionalMedia extends IStateDataCollectibleAdditional {
    path: string
}

export interface IStateDataCollectibleAdditionalText extends IStateDataCollectibleAdditional {
    text: string
}