import {Signal} from "../../../../lib/helpers/Signal";
import {
    selectCollectible,
    selectCollectibleOfType,
    selectScene,
    selectUserActiveScene,
    selectUserScene
} from "../../../../store/store_selector";
import {addPickElementScene, getState, pickupHint, pickupPreHint, store} from "../../../../store/store";
import {IStateDataSceneCollectibleType} from "../../../../store/state_enums";
import FocusUtils from "../scenery/FocusUtils";
import {SceneryUtils} from "../scenery/SceneryUtils";
import {AudioHandler} from "../../../../lib/audio/AudioHandler";
import {gsap} from "gsap";
import {Expo, Sine} from "gsap/gsap-core";

const debug = require("debug")(`front:RaycastManager`);

class RaycastManager {
    private static instance: RaycastManager;

    public onInteract: Signal = new Signal();

    private constructor() { }

    public static getInstance(): RaycastManager {
        if (!RaycastManager.instance) {
            RaycastManager.instance = new RaycastManager();
        }

        return RaycastManager.instance;
    }

    public clickProcessing(id: string, object: any) {
        debug("Clicked on", id);
        // SCENE
        const userSceneId = selectUserActiveScene(getState());
        const scene = selectScene(userSceneId)(getState().data);
        const userSceneData = selectUserScene(userSceneId)(getState().user_data);

        // GET COLLECTIBLE DATA
        const collectibleSceneData = scene.collectibles.find(value => value.trigger == id);

        if(collectibleSceneData !== undefined && !FocusUtils.isFocus) {
            // COLLECTIBLE EXIST ON SCENE
            let collectible = selectCollectible(collectibleSceneData.collectible_id)(getState().data);

            if(collectible) {
                gsap.to(object.material.color, {r: 1.5, g: 1.5, b: 1.5, duration: 0.4, ease: Expo.easeOut});
                gsap.to(object.material.color, {r: 1, g: 1, b: 1, duration: 0.4, ease: Sine.easeIn, delay: 0.4});
                switch (collectible.type) {
                    case IStateDataSceneCollectibleType.HINT:
                        // DISPATCH UI UPDATE
                        this.onInteract.dispatch(collectible);
                        // UPDATE STORE WITH USER DATA
                        store.dispatch(addPickElementScene({pickup: collectible.id, scene: userSceneId}));
                        // SET FOCUS
                        FocusUtils.focusOn(collectibleSceneData.focus.coords, collectibleSceneData.focus.rotation);

                        AudioHandler.play("pickup");
                        break;
                    case IStateDataSceneCollectibleType.PICKUP:
                        if(userSceneData.hint.pre_pickup) {
                            // ADD ELEMENT TO PICKUP LIST
                            store.dispatch(addPickElementScene({pickup: collectible.id, scene: userSceneId}));
                            // UPDATE HINT
                            store.dispatch(pickupHint({scene: userSceneId, bool: true}));
                            // DISPATCH UI UPDATE
                            this.onInteract.dispatch(collectible, true);

                            AudioHandler.play("pickup");
                        }
                        else {
                            // GET LINKED PRE PICKUP ELEMENT
                            let collectible_prepickup = selectCollectibleOfType(IStateDataSceneCollectibleType.PRE_PICKUP)(getState().data);
                            // DISPATCH UI UPDATE
                            this.onInteract.dispatch(collectible_prepickup, false);
                        }
                        // SET FOCUS
                        FocusUtils.focusOn(collectibleSceneData.focus.coords, collectibleSceneData.focus.rotation);
                        break;
                    case IStateDataSceneCollectibleType.PRE_PICKUP:
                        // ADD ELEMENT TO PICKUP LIST
                        store.dispatch(addPickElementScene({pickup: collectible.id, scene: userSceneId}));
                        // UPDATE PRE HINT
                        store.dispatch(pickupPreHint({scene: userSceneId, bool: true}));
                        // DISPATCH UI UPDATE
                        this.onInteract.dispatch(collectible, true);
                        // REMOVE ELEMENT FROM SCENE
                        SceneryUtils.destroyElementByName(collectibleSceneData.trigger);

                        AudioHandler.play("pickup");

                        break;
                }
            }
        }
    }
}

export default RaycastManager;
