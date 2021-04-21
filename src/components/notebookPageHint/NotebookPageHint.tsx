import css from './NotebookPageHint.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {useTranslation} from "react-i18next";

interface IProps {
  className?: string
}

const componentName = "NotebookPageHint";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageHint
 */
function NotebookPageHint (props: IProps) {
  const { t } = useTranslation();

  return <div className={merge([css.root, props.className])}>
    {t('notebook__page__hint__title')}
  </div>
}

export default NotebookPageHint
