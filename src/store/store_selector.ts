import {getState, RootState, store} from "./store";
import {createSelector, OutputSelector} from "@reduxjs/toolkit";
import {ICustomState, ICustomStateScene} from "./state_interface";

export const selectActiveScene = (state: RootState) => state.active_scene;

// get store version
export const selectStoreVersion = (state: RootState) => state.version;

export const selectScenes = createSelector(
    getState,
    (state) => state.scenes,
);

export const selectScene = scene => {
    return createSelector<ICustomState, ICustomStateScene[], ICustomStateScene>(
        selectScenes,
        items => items.find(item => item.scene == scene)
    );
};