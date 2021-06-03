import css from './NotebookPageMapDetails.module.less';
import React from 'react';
import {merge} from "../../../lib/utils/arrayUtils";
import {selectCollectiblesOfSceneWithPickup, selectScene} from "../../../store/store_selector";
import {getState} from "../../../store/store";
import {IStateDataSceneCollectibleType} from "../../../store/state_enums";
import {useTranslation} from "react-i18next";
import {WebGlManager} from "../../webGlCanvas/WebGlManagerClasses/WebGlManager";
import Button, {ButtonStyle} from "../../button/Button";
import NotebookSignal from "../notebook-signal";

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

  return <div className={merge([css.root, props.className, "popup mapPopup"])}>
    <p>
      Partir à la découverte de la zone {sceneData.name} ?
    </p>
    <div className={"buttonGroup"}>
    <Button style={ButtonStyle.DEFAULT} onClick={() =>  { NotebookSignal.getInstance().onToggle.dispatch(true);}} label={"Rester ici"}/>
    <Button style={ButtonStyle.PATTERN} onClick={() =>  {WebGlManager.getInstance().toggleScenery(sceneData.id);}} label={"Let's go"}/>
    </div>
  </div>
}

export default NotebookPageMapDetails
