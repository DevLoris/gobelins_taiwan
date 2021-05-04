import {Signal} from "../../../../lib/helpers/Signal";
import {selectCollectible, selectScene, selectUserActiveScene} from "../../../../store/store_selector";
import {addPickElementScene, getState, pickupHint, pickupPreHint, store} from "../../../../store/store";
import {IStateDataSceneCollectibleType} from "../../../../store/state_enums";
import FocusUtils from "../scenery/FocusUtils";

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

        // GET COLLECTIBLE DATA
        const collectibleSceneData = scene.collectibles.find(value => value.trigger == id);

        if(collectibleSceneData !== undefined) {
            // COLLECTIBLE EXIST ON SCENE
            let collectible = selectCollectible(collectibleSceneData.collectible_id)(getState().data);
            if(collectible) {
                switch (collectible.type) {
                    case IStateDataSceneCollectibleType.HINT:
                        // SHOW UI
                        this.onInteract.dispatch(collectible);
                        // UPDATE STORE WITH USER DATA
                        store.dispatch(addPickElementScene({pickup: collectible.id, scene: userSceneId}));

                        FocusUtils.focusOn({x: 2, y: 4, z: 5}, {x: 3, y: 1, z:3});

                        break;
                    case IStateDataSceneCollectibleType.PICKUP:
                        store.dispatch(pickupHint({scene: userSceneId, bool: true}));
                        // todo UI & other
                        break;
                    case IStateDataSceneCollectibleType.PRE_PICKUP:
                        store.dispatch(pickupPreHint({scene: userSceneId, bool: true}));
                        // todo UI & other
                        break;
                }
            }
        }
    }
}

export default RaycastManager;