import css from './NotebookPageMapDetails.module.less';
import React from 'react';
import {merge} from "../../../lib/utils/arrayUtils";
import {selectCollectiblesOfSceneWithPickup, selectScene} from "../../../store/store_selector";
import {getState} from "../../../store/store";
import {IStateDataSceneCollectibleType} from "../../../store/state_enums";
import {useTranslation} from "react-i18next";
import {WebGlManager} from "../../webGlCanvas/WebGlManagerClasses/WebGlManager";

interface IProps {
  className?: string,
  sceneId: string,
  onClickClose: () => void,
}


const componentName = "NotebookPageMapDetails";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageMapDetails
 */
function NotebookPageMapDetails (props: IProps) {
  // use translation
  const { t } = useTranslation();

  let sceneData = selectScene(props.sceneId)(getState().data);
  const collectibles  = selectCollectiblesOfSceneWithPickup(props.sceneId)(getState().data, getState().user_data);

  // find bc one by scene
  const pickup = collectibles.find(value => value.type == IStateDataSceneCollectibleType.PICKUP);
  const pre_pickup = collectibles.find(value => value.type == IStateDataSceneCollectibleType.PRE_PICKUP);

  // filter bc many by scene
  const hints = collectibles.filter(value => value.type == IStateDataSceneCollectibleType.HINT);

  return <div className={merge([css.root, props.className])}>
    <h2>{sceneData.name}</h2>
    <div>
      <strong>{t("notebook__page__map__label__pickup")} : {pickup !== undefined && pickup.pickup ? 1 : 0} / 1</strong>
    </div>
    <div>
      <strong>{t("notebook__page__map__label__hints")} : {hints.filter(value => value.pickup).length} / {hints.length}</strong>
    </div>
    <div>
      <button className={""} onClick={() => {
        WebGlManager.getInstance().toggleScenery(sceneData.id);
      }}>{t("notebook__page__map__label__goto")}</button>
    </div>
  </div>
}

export default NotebookPageMapDetails
