import css from './NotebookLabelToggler.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";

interface IProps {
  className?: string,
  label?: string,
  onClick?: () => void,
}

const componentName = "NotebookLabelToggler";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookLabelToggler
 */
function NotebookLabelToggler (props: IProps) {
  return <div onClick={props.onClick} className={merge([css.root, props.className])}>
      {props.label}
  </div>
}

export default NotebookLabelToggler
