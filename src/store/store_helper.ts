import {ICustomStateScene} from "./state_interface_experience";

// Helper
export function createEmptyScenery(scene: string, visible_on_map: boolean = false) : ICustomStateScene {
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
        visible_on_map
    }
}
