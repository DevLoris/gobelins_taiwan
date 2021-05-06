import css from './NotebookPageElements.module.less';
import React, {useState} from 'react';
import {merge} from "../../../lib/utils/arrayUtils";
import {useTranslation} from "react-i18next";
import {selectCollectiblesOfSceneWithPickup, selectUserActiveScene} from "../../../store/store_selector";
import {getState} from 'store/store';
import {IStateDataCollectibleWithPickup} from "../../../store/state_interface_data";
import NotebookElement from "../notebookElement/NotebookElement";
import NotebookPageElementsDetails from "../notebookPageElementsDetails/NotebookPageElementsDetails";
import NotebookTitle from "../notebookTitle/NotebookTitle";
import {IStateDataSceneCollectibleType} from "../../../store/state_enums";

interface IProps {
  className?: string
}

const componentName = "NotebookPageElements";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageElements
 */
function NotebookPageElements (props: IProps) {
  // translation mobule
  const { t } = useTranslation();

  // sub-page state
  const [page, setPage] : [IStateDataCollectibleWithPickup, (IStateDataCollectibleWithPickup) => void]= useState(null);
  const [showPage, toggleShowPage]: [boolean, (boolean) =>  void] = useState(false);

  // get collectibles of scene
  const active_scene  = selectUserActiveScene(getState());
  const collectibles  = selectCollectiblesOfSceneWithPickup(active_scene)(getState().data, getState().user_data).filter(value => {
    return value.type == IStateDataSceneCollectibleType.HINT;
  });

  if(showPage) {
    return <NotebookPageElementsDetails data={page} onExit={() => { toggleShowPage(false); }} />
  }
  else {
    return <div className={merge([css.root, props.className])}>
      <NotebookTitle title={t('notebook__page__elements__title')}/>

      {collectibles.map((data, i) => {
        return (<NotebookElement callback={() => {
          setPage(data);
          toggleShowPage(true)
        }} data={data} key={i}/>)
      })}
    </div>
  }
}

export default NotebookPageElements
