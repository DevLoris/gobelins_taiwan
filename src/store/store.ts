import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit'
import {
    IBooleanScene,
    ICustomState,
    ICustomStateScene,
    initialState,
    IPickupElement,
    STORE_VERSION
} from "./state_interface";
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
                found.hint.pre_pickup = payload.payload.bool;
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
        }
    }
});

let store = configureStore({
    reducer: experienceSlice.reducer,
});

// Subscribe pour les mises à jour dans le Store locator
store.subscribe(() => {
    debug('Store update');
    ls('save', store.getState());
});

// exports rapides des méthodes de store
export {store};
export const { getState, dispatch } = store;
export const { activeScenery, addScenery, addPickElementScene, pickupHint, pickupPreHint, toggleOnMap, vlogIntro, vlogOutro } = experienceSlice.actions;

// Types relatifs au store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
