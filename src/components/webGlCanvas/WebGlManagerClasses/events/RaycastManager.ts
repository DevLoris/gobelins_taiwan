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

    public clickProcessing(id: string) {
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
                        // SHOW UI
                        this.onInteract.dispatch(collectible);
                        // UPDATE STORE WITH USER DATA
                        store.dispatch(addPickElementScene({pickup: collectible.id, scene: userSceneId}));

                        FocusUtils.focusOn(collectibleSceneData.focus.coords, collectibleSceneData.focus.rotation);

                        break;
                    case IStateDataSceneCollectibleType.PICKUP:
                        if(userSceneData.hint.pre_pickup) {
                            store.dispatch(addPickElementScene({pickup: collectible.id, scene: userSceneId}));
                            store.dispatch(pickupHint({scene: userSceneId, bool: true}));
                            this.onInteract.dispatch(collectible, true);
                        }
                        else {
                            let collectible_prepickup = selectCollectibleOfType(IStateDataSceneCollectibleType.PRE_PICKUP)(getState().data);
                            this.onInteract.dispatch(collectible_prepickup, false);

                        }
                        console.log(collectibleSceneData);
                        FocusUtils.focusOn(collectibleSceneData.focus.coords, collectibleSceneData.focus.rotation);
                        break;
                    case IStateDataSceneCollectibleType.PRE_PICKUP:
                        store.dispatch(addPickElementScene({pickup: collectible.id, scene: userSceneId}));
                        store.dispatch(pickupPreHint({scene: userSceneId, bool: true}));
                        this.onInteract.dispatch(collectible, true);
                        SceneryUtils.destroyElementByName(collectibleSceneData.trigger);
                        break;
                }
            }
        }
    }
}

export default RaycastManager;