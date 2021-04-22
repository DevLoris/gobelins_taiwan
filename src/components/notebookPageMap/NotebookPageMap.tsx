import css from './NotebookPageMap.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import NotebookTitle from "../notebookTitle/NotebookTitle";
import {useTranslation} from "react-i18next";

interface IProps {
  className?: string
}

const componentName = "NotebookPageMap";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageMap
 */
function NotebookPageMap (props: IProps) {
    const { t } = useTranslation();

  return <div className={merge([css.root, props.className])}>
      <NotebookTitle title={t('notebook__page__map__title')}/>
      <div>
          <img src={"/public/images/taiwan.jpeg"} />
      </div>
  </div>
}

export default NotebookPageMap
