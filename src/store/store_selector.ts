import {getState, RootState, store} from "./store";
import {createSelector, OutputSelector} from "@reduxjs/toolkit";
import {ICustomState, ICustomStateScene} from "./state_interface_experience";
import {
    IStateDataCollectible,
    IStateData,
    IStateDataScene,
    IStateDataCollectibleWithPickup
} from "./state_interface_data";

// RELATIVE TO USER DATA
// Select user save related data

export const selectUserActiveScene = (state: RootState) => state.user_data.active_scene;

// get store version
export const selectUserStoreVersion = (state: RootState) => state.user_data.version;

export const selectUserScenes = createSelector(
    getState,
    (state) => state.user_data.scenes,
);

export const selectUserScene = scene => {
    return createSelector<ICustomState, ICustomStateScene[], ICustomStateScene>(
        selectUserScenes,
        items => items.find(item => item.scene == scene)
    );
};

// RELATIVE TO GAME DATA
// Select game related data (scene, collectible information etc.)

export const selectScenes = createSelector(
    getState,
    (state) => state.data.scenes,
);

export const selectScene = scene => {
    return createSelector<IStateData, IStateDataScene[], IStateDataScene>(
        selectScenes,
        items => items.find(item => item.id == scene)
    );
};

export const selectModels = createSelector(
    getState,
    (state) => state.data.models,
);

export const selectCollectibles = createSelector(
    getState,
    (state) => state.data.collectibles,
);

export const selectCollectible = collectible => {
    return createSelector<IStateData, IStateDataCollectible[], IStateDataCollectible>(
        selectCollectibles,
        items => items.find(item => item.id == collectible)
    );
};

// todo refacto this selector
export const selectCollectiblesOfSceneWithPickup = (scene: string) => {
    return createSelector<IStateData, ICustomState, IStateDataScene[],  IStateDataCollectible[], ICustomStateScene[], IStateDataCollectibleWithPickup[]>(
        selectScenes,
        selectCollectibles,
        selectUserScenes,
        (scenes: IStateDataScene[], collectibles: IStateDataCollectible[], user_scenes: ICustomStateScene[]) => {
            return scenes.find(value => value.id == scene).collectibles.map(value => {
                // on récupère les données de la scène
                let user_scene = user_scenes.find(value1 => value1.scene == scene);
                // on check si il l'a ramassé dans la scène
                let pickup = (user_scene !== undefined && user_scene.picked_elements.includes(value.collectible_id));


                console.log(value, scene, user_scenes, pickup);

                // on retourne
                return {...collectibles.find(value1 => value1.id == value.collectible_id), pickup}
            }).filter(value => value.name !== undefined);
        }
    );
};
