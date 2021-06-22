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
import {WebGlManager} from "../WebGlManager";
import {SpriteMaterial, TextureLoader} from "three";
import {TextureAnimator} from "../TextureAnimator";

const debug = require("debug")(`front:RaycastManager`);

export enum RaycastInteractionType {
    ELEMENTS,
    ITEMS
}

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
                switch (collectible.type) {
                    case IStateDataSceneCollectibleType.HINT:
                        // DISPATCH UI UPDATE
                        this.onInteract.dispatch(RaycastInteractionType.ELEMENTS, collectible);
                        // UPDATE STORE WITH USER DATA
                        store.dispatch(addPickElementScene({pickup: collectible.id, scene: userSceneId}));
                        // SET FOCUS
                        FocusUtils.focusOn(collectibleSceneData.focus.coords, collectibleSceneData.focus.rotation);

                        // Set sprite as cheked
                        WebGlManager.getInstance().getAnimatedSprites().forEach((sprite) => {
                            if(sprite.pinName === collectible.id) {
                                WebGlManager.getInstance().setSpriteTexturePinValid(sprite);
                            }
                        });

                        AudioHandler.play("pickup");
                        break;
                    case IStateDataSceneCollectibleType.PICKUP:
                        RaycastManager._highlightAnimation(object);
                        if(userSceneData.hint.pre_pickup) {
                            // ADD ELEMENT TO PICKUP LIST
                            store.dispatch(addPickElementScene({pickup: collectible.id, scene: userSceneId}));
                            // UPDATE HINT
                            store.dispatch(pickupHint({scene: userSceneId, bool: true}));
                            // DISPATCH UI UPDATE
                            this.onInteract.dispatch(RaycastInteractionType.ELEMENTS, collectible, true);

                            AudioHandler.play("pickup");
                        }
                        else {
                            // GET LINKED PRE PICKUP ELEMENT
                            let collectible_prepickup = selectCollectibleOfType(IStateDataSceneCollectibleType.PRE_PICKUP)(getState().data);
                            // DISPATCH UI UPDATE
                            this.onInteract.dispatch(RaycastInteractionType.ELEMENTS, collectible_prepickup, false);
                        }
                        // SET FOCUS
                        FocusUtils.focusOn(collectibleSceneData.focus.coords, collectibleSceneData.focus.rotation);
                        break;
                    case IStateDataSceneCollectibleType.PRE_PICKUP:
                        RaycastManager._highlightAnimation(object);
                        // ADD ELEMENT TO PICKUP LIST
                        store.dispatch(addPickElementScene({pickup: collectible.id, scene: userSceneId}));
                        // UPDATE PRE HINT
                        store.dispatch(pickupPreHint({scene: userSceneId, bool: true}));
                        // DISPATCH UI UPDATE
                        this.onInteract.dispatch(RaycastInteractionType.ELEMENTS, collectible, true);
                        // REMOVE ELEMENT FROM SCENE
                        SceneryUtils.destroyElementByName(collectibleSceneData.trigger);

                        AudioHandler.play("coins");

                        break;
                    case IStateDataSceneCollectibleType.ENDING:
                        // TODO: Make an action with the thing that was picked up
                        console.log(collectible);
                        break;
                }
            }
        }
        else {
            this.onInteract.dispatch(RaycastInteractionType.ITEMS, object);
        }
    }

    private static _highlightAnimation(object) {
        gsap.to(object.material.color, {r: 1.5, g: 1.5, b: 1.5, duration: 0.4, ease: Expo.easeOut});
        gsap.to(object.material.color, {r: 1, g: 1, b: 1, duration: 0.4, ease: Sine.easeIn, delay: 0.4});
    }
}

export default RaycastManager;
