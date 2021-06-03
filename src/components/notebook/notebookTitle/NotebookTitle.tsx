import css from './NotebookTitle.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string,
  title?: string,
  chinese_title?:string,
  phonetic?:string,
  picked?: number,
  total?: number,
  onClick?: () => void
}

const componentName = "NotebookTitle";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookTitle
 */
function NotebookTitle (props: IProps) {
  return <div onClick={props.onClick} className={merge([css.root, props.className, "big-title-block"])}>
    <div className={"title-block-mandarin"}>{props.chinese_title}</div>
    <div>
      <h1>{props.title}</h1>
      <div className={"title-block-phonetic"}>
        <span>zn.</span> [{props.phonetic}]
      </div>
    </div>
    <div className={"title-block-counter"}>
      <span>{props.picked}</span>
      <span>/{props.total}</span>
    </div>
  </div>
}

export default NotebookTitle
