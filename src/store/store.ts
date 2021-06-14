import {createSlice, configureStore, PayloadAction, combineReducers} from '@reduxjs/toolkit'
import {
    IBooleanScene,
    ICustomState,
    ICustomStateScene,
    initialState,
    IPickupElement,
    STORE_VERSION
} from "./state_interface_experience";
import data from '../data/data.json';
import {IStateData} from "./state_interface_data";
const ls = require('local-storage');

const debug = require("debug")(`front:Store`);

//------------------------------------------
// STORE
// Stockage des données, retrieve (Localstorage)
//------------------------------------------

const experienceSlice = createSlice({
    name: 'experience',
    initialState: ((): ICustomState => {
        // on reprendre la sauvegarde
        let save = ls('save');

        // si elle existe pas ou si la version est différente du modèle de donnée, on la jarte
        if(save == null || save.version != STORE_VERSION)
            return initialState;

        // sinon on retourne la state combinée
        return {
            ...initialState,
            ...save
        }
    })(),
    reducers: {
        activeScenery: (state: ICustomState, action: PayloadAction<string>) => {
            state.active_scene = action.payload
        },
        tutorial: (state: ICustomState, action: PayloadAction<boolean>) => {
            state.tutorial = action.payload
        },
        addScenery: (state: ICustomState, scene: PayloadAction<ICustomStateScene>) =>  {
            // ajout  d'une scène dans le store, si elle existe déjà on l'ajoute pas
            let found = state.scenes.find(value => value.scene == scene.payload.scene);
            if(!found)
                state.scenes = [
                    ...state.scenes,
                    scene.payload
                ]
        },
        addPickElementScene: (state: ICustomState, payload: PayloadAction<IPickupElement>) => {
            // ajout d'un élément si la scene existe
            let found =  state.scenes.find(value => value.scene == payload.payload.scene);
            if(found) {
                // on ajoute en évitant les duplicatas
                found.picked_elements = Array.from( new Set([...found.picked_elements, payload.payload.pickup]));
            }
        },
        pickupPreHint: (state: ICustomState, payload: PayloadAction<IBooleanScene>) => {
            let found =  state.scenes.find(value => value.scene == payload.payload.scene);
            if(found) {
                found.hint.pre_pickup = payload.payload.bool;
            }
        },
        pickupHint: (state: ICustomState, payload: PayloadAction<IBooleanScene>) => {
            let found =  state.scenes.find(value => value.scene == payload.payload.scene);
            if(found) {
                found.hint.pickup = payload.payload.bool;
            }
        },
        toggleOnMap: (state: ICustomState, payload: PayloadAction<IBooleanScene>) => {
            let found =  state.scenes.find(value => value.scene == payload.payload.scene);
            if(found) {
                found.visible_on_map = payload.payload.bool;
            }
        },
        vlogIntro: (state: ICustomState, payload: PayloadAction<IBooleanScene>) => {
            let found =  state.scenes.find(value => value.scene == payload.payload.scene);
            if(found) {
                found.vlog.intro = payload.payload.bool;
            }
        },
        vlogOutro: (state: ICustomState, payload: PayloadAction<IBooleanScene>) => {
            let found = state.scenes.find(value => value.scene == payload.payload.scene);
               if(found) {
                found.vlog.outro = payload.payload.bool;
            }
        },
        toggleAntiAliasing: (state: ICustomState, payload: PayloadAction<boolean>) => {
            state.settings.antialiasing = payload.payload;
        },
        toggleOutlineEffect: (state: ICustomState, payload: PayloadAction<boolean>) => {
            state.settings.outline = payload.payload;
        },
    }
});

const dataSlice = createSlice({
    name: 'data',
    initialState: ((): IStateData => {
        // @ts-ignore
        return { scenes: data.scenes, collectibles: data.collectibles, models: data.models, audios: data.audios };
    })(),
    reducers: {
    }
});

let store = configureStore({
    reducer: combineReducers({user_data:  experienceSlice.reducer, data:  dataSlice.reducer}),
});

// Subscribe pour les mises à jour dans le Store locator
store.subscribe(() => {
    ls('save', store.getState().user_data);
    debug('Store update');
});

// exports rapides des méthodes de store
export {store};
export const { getState, dispatch } = store;
export const { tutorial, activeScenery, addScenery, addPickElementScene, pickupHint, pickupPreHint, toggleOnMap, vlogIntro, vlogOutro, toggleAntiAliasing, toggleOutlineEffect } = experienceSlice.actions;

// Types relatifs au store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
