import {DEFAULT_SCENE} from "../vars/scene_vars";

export const STORE_VERSION = 8;

// Store state
export interface ICustomState {
    active_scene: string,
    tutorial: TutorialState,
    version: number,
    scenes: ICustomStateScene[],
    sequencer: {
        chapter: number,
        step: number,
    },
    settings: ICustomStateSettings
}

export enum TutorialState {
    INTRODUCTION,
    BEFORE_MAP,
    MAP,
    DISABLED
}

export interface ICustomStateSettings  {
    antialiasing: boolean,
    outline: boolean
}

// Scene definition
export interface ICustomStateScene {
    scene: string,
    picked_elements: string[],
    vlog: {
        intro: boolean,
        outro: boolean
    },
    hint: {
        pre_pickup: boolean,
        pickup: boolean
    },
    visible_on_map: boolean
}

// Pickup
export interface IPickupElement {
    scene: string,
    pickup: string,
}

// Pickup
export interface IBooleanScene {
    scene: string,
    bool: boolean,
}

// Sequencer State Progression
export interface ISequencerProgressionPayload {
    chapter: number,
    step: number,
}

// Define the initial state using that type
export const initialState: ICustomState = {
    active_scene: DEFAULT_SCENE,
    tutorial: TutorialState.INTRODUCTION,
    version: STORE_VERSION,
    scenes: [],
    settings: {
        antialiasing: true,
        outline: true
    },
    sequencer: {
        chapter: 0,
        step: 0,
    }
};
