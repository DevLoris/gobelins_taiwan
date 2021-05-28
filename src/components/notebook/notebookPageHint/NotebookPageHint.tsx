import css from './NotebookPageHint.module.less';
import React, {MutableRefObject, RefObject} from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import {useTranslation} from "react-i18next";
import NotebookTitle from "../notebookTitle/NotebookTitle";
import {selectCollectiblesOfSceneWithPickup, selectUserActiveScene} from "../../../store/store_selector";
import {getState} from "../../../store/store";
import {IStateDataSceneCollectibleType} from "../../../store/state_enums";
import NotebookPageElementsDetails from "../notebookPageElementsDetails/NotebookPageElementsDetails";

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

  if(pickup.pickup)
    return <div className={merge([css.root, props.className])}>
      <NotebookTitle title={t('notebook__page__hint__title')}/>
      <NotebookPageElementsDetails data={pickup}/>
    </div>
  else if(pre_pickup.pickup) {
    return <div className={merge([css.root, props.className])}>
      <NotebookTitle title={t('notebook__page__hint__title')}/>
      <p>{pickup.hint}</p>
      <p>élément nécessaire ramassé</p>
    </div>
  }
  else  {
    return <div className={merge([css.root, props.className])}>
      <NotebookTitle title={t('notebook__page__hint__title')}/>
      <p>{pickup.hint}</p>
    </div>
  }
}

export default NotebookPageHint
