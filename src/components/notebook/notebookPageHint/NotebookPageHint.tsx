import React, {useEffect} from 'react';
import {selectCollectiblesOfSceneWithPickup, selectUserActiveScene} from "../../../store/store_selector";
import {getState} from "../../../store/store";
import {IStateDataSceneCollectibleType} from "../../../store/state_enums";
import NotebookPageElementsDetails from "../notebookPageElementsDetails/NotebookPageElementsDetails";
import NotebookHint from "../notebookHint/NotebookHint";

interface IProps {
  className?: string
}

/**
 * @name NotebookPageHint
 * @desc Page objectif du carnet
 */
function NotebookPageHint (props: IProps) {
  const active_scene  = selectUserActiveScene(getState());
  const collectibles = selectCollectiblesOfSceneWithPickup(active_scene)(getState().data, getState().user_data);
  const pickup  = collectibles.find(value => {
    return value.type == IStateDataSceneCollectibleType.PICKUP;
  });

  return (
      <>
        <NotebookPageElementsDetails data={pickup}/>
        <NotebookHint showDefault={!pickup.pickup} showClose={pickup.pickup} hint={pickup.hint} hint_audio={pickup.hint_audio}/>
      </>
  )
}

export default NotebookPageHint
