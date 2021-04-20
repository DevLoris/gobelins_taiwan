export const STORE_VERSION = 2;

// Store state
export interface ICustomState {
    active_scene: string,
    version: number,
    scenes: ICustomStateScene[],
}

// Scene definition
export interface ICustomStateScene {
    scene: string,
    picked_elements: string[],
    vlog: {
        intro: boolean,
        outro: boolean
    },
    visible_on_map: boolean
}

// Pickup
export interface IPickupElement {
    scene: string,
    pickup: string,
}

// Define the initial state using that type
export const initialState: ICustomState = {
    active_scene: null,
    version: STORE_VERSION,
    scenes: []
};
