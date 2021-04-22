import css from './NotebookTitle.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string,
  title?: string
}

const componentName = "NotebookTitle";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookTitle
 */
function NotebookTitle (props: IProps) {
  return <h2 className={merge([css.root, props.className])}>
    {props.title}
  </h2>
}

export default NotebookTitle
