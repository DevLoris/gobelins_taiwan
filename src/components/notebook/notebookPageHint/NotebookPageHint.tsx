import css from './NotebookPageHint.module.less';
import React, {MutableRefObject, RefObject, useEffect} from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import {useTranslation} from "react-i18next";
import NotebookTitle from "../notebookTitle/NotebookTitle";
import {selectCollectiblesOfSceneWithPickup, selectUserActiveScene} from "../../../store/store_selector";
import {getState} from "../../../store/store";
import {IStateDataSceneCollectibleType} from "../../../store/state_enums";
import NotebookPageElementsDetails from "../notebookPageElementsDetails/NotebookPageElementsDetails";
import {AudioHandler} from "../../../lib/audio/AudioHandler";
import NotebookHint from "../notebookHint/NotebookHint";

interface IProps {
  className?: string,
  ref?: MutableRefObject<any>
}

const componentName = "NotebookPageHint";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageHint
 */
function NotebookPageHint (props: IProps) {
  const { t } = useTranslation();

  const active_scene  = selectUserActiveScene(getState());
  const collectibles = selectCollectiblesOfSceneWithPickup(active_scene)(getState().data, getState().user_data);
  const pickup  = collectibles.find(value => {
    return value.type == IStateDataSceneCollectibleType.PICKUP;
  });
  const pre_pickup  = collectibles.find(value => {
    return value.type == IStateDataSceneCollectibleType.PRE_PICKUP;
  });

  return (
      <>
        <NotebookPageElementsDetails data={pickup}/>
        <NotebookHint showDefault={!pickup.pickup} showClose={pickup.pickup} hint={pickup.hint} hint_audio={"ambient_city"}/>
      </>
  )
}

export default NotebookPageHint
