
export enum IStateDataSceneElementType {
    CUBE = "cube",
    OBJECT_CONTAINER = "object_container",
    SPRITE = "sprite"
}

export enum IStateDataSceneLightType {
    HEMISPHERE = "hemisphere",
    DIRECTIONAL = "directional",
    AMBIENT = "ambient",
}

export enum IStateDataSceneCollectibleType {
    PRE_PICKUP = "pre_pickup",
    PICKUP = "pickup",
    HINT = "hint",
    ENDING = "ending"
}

export enum IStateDataSceneEffectsType {
    OUTLINE = "outline"
}

export enum IStateDataCollectibleAdditionalDataType {
    TIPS = "tips",
    TEXT = "text",
    IMAGE = "image",
    GALLERY  = "gallery",
    AUDIO = "audio",
    PHONETIC = "phonetic",
    TESTIMONIAL = "testimonial",
    YOUTUBE  = "youtube",
    SEPARATOR = "separator"
}

export enum SceneDataAutoMessageMoment {
    BEFORE_PRE_PICKUP = "before_pre_pickup",
    AFTER_PRE_PICKUP = "after_pre_pickup",
    AFTER_PICKUP = "after_pickup"
}
