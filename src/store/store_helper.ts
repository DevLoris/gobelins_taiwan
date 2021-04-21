import {ICustomStateScene} from "./state_interface";

// Helper
export function createEmptyScene(scene: string) : ICustomStateScene {
    return {
        scene,
        picked_elements: [],
        vlog: {
            intro: false,
            outro: false
        },
        hint: {
            pre_pickup: false,
            pickup: false
        },
        visible_on_map: false
    }
}