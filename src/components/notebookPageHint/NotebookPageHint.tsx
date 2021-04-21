import css from './NotebookPageHint.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";

interface IProps {
  className?: string
}

const componentName = "NotebookPageHint";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageHint
 */
function NotebookPageHint (props: IProps) {
  return <div className={merge([css.root, props.className])}>
      {componentName}
  </div>
}

export default NotebookPageHint
