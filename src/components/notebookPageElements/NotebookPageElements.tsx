import css from './NotebookPageElements.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";

interface IProps {
  className?: string
}

const componentName = "NotebookPageElements";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageElements
 */
function NotebookPageElements (props: IProps) {
  return <div className={merge([css.root, props.className])}>
      {componentName}
  </div>
}

export default NotebookPageElements
