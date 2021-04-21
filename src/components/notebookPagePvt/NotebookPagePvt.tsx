import css from './NotebookPagePvt.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";

interface IProps {
  className?: string
}

const componentName = "NotebookPagePvt";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPagePvt
 */
function NotebookPagePvt (props: IProps) {
  return <div className={merge([css.root, props.className])}>
      {componentName}
  </div>
}

export default NotebookPagePvt
