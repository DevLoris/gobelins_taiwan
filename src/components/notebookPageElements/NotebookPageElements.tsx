import css from './NotebookPageElements.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {useTranslation} from "react-i18next";
import {selectCollectiblesOfSceneWithPickup} from "../../store/store_selector";
import {getState} from 'store/store';

interface IProps {
  className?: string
}

const componentName = "NotebookPageElements";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageElements
 */
function NotebookPageElements (props: IProps) {
  const { t } = useTranslation();

  const collectibles  = selectCollectiblesOfSceneWithPickup('test')(getState().data);

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
