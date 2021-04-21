import css from './NotebookPageElements.module.less';
import React, {useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {useTranslation} from "react-i18next";
import {selectCollectiblesOfSceneWithPickup, selectUserActiveScene} from "../../store/store_selector";
import {getState} from 'store/store';
import {IStateDataCollectibleWithPickup} from "../../store/state_interface_data";

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

  // get collectibles of scene
  const active_scene  = selectUserActiveScene(getState());
  const collectibles  = selectCollectiblesOfSceneWithPickup(active_scene)(getState().data);

  return <div className={merge([css.root, props.className])}>
    {t('notebook__page__elements__title')}

    {collectibles.map((data, i) => {
      return (<div key={i}><img src={data.asset} title={data.name} />
        {data.pickup && ("Ramassé")}
        {!data.pickup && ("Pas ramassé")}
      </div>)
    })}
  </div>
}

export default NotebookPageElements
