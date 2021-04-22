import css from './NotebookHint.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string
}

const componentName = "NotebookHint";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookHint
 */
function NotebookHint (props: IProps) {
  return <div className={merge([css.root, props.className])}>
      {componentName}
  </div>
}

export default NotebookHint
