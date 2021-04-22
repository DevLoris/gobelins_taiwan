import css from './NotebookPagePvt.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import {useTranslation} from "react-i18next";
import NotebookTitle from "../notebookTitle/NotebookTitle";

interface IProps {
  className?: string
}

const componentName = "NotebookPagePvt";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPagePvt
 */
function NotebookPagePvt (props: IProps) {
  const { t } = useTranslation();

  return <div className={merge([css.root, props.className])}>
    <NotebookTitle title={t('notebook__page__pvt__title')}/>
  </div>
}

export default NotebookPagePvt
