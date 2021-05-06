import css from './NotebookToggler.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string,
  onClick: () => void,
}

const componentName = "NotebookToggler";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookToggler
 */
function NotebookToggler (props: IProps) {
  return <div onClick={props.onClick} className={merge([css.root, props.className])}>
    <img src={"/public/book.png"} alt={"menu"}/>
  </div>
}

export default NotebookToggler
