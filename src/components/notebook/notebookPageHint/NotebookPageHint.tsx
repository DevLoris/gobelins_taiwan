import css from './NotebookPageHint.module.less';
import React, {MutableRefObject, RefObject} from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import {useTranslation} from "react-i18next";
import NotebookTitle from "../notebookTitle/NotebookTitle";
import {selectCollectiblesOfSceneWithPickup, selectUserActiveScene} from "../../../store/store_selector";
import {getState} from "../../../store/store";
import {IStateDataSceneCollectibleType} from "../../../store/state_enums";

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
  const important_element  = selectCollectiblesOfSceneWithPickup(active_scene)(getState().data, getState().user_data).find(value => {
    return value.type == IStateDataSceneCollectibleType.PICKUP;
  });

  if(important_element.pickup)
    return <div className={merge([css.root, props.className])}>
      <NotebookTitle title={t('notebook__page__hint__title')}/>
    </div>
  else
    return <div className={merge([css.root, props.className])}>
      <NotebookTitle title={t('notebook__page__hint__title')}/>
      <p>{important_element.hint}</p>
    </div>
}

export default NotebookPageHint
