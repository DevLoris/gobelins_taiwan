import css from './NotebookTitle.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string,
  title?: string,
  chinese_title?:string,
  phonetic?:string,
  pin?:string,
  picked?: number,
  total?: number,
  onClick?: () => void
}

/**
 * @name NotebookTitle
 * @desc Affiche un titre, avec son équivalent chinois et la phonétique,  possibilité d'afficher une pin aussi
 */
function NotebookTitle (props: IProps) {
  return <div className={props.className}><div onClick={props.onClick} className={merge([(props.pin !== undefined) ? "big-title-block_pin": "", css.root, "big-title-block"])}>
    {(props.pin !== undefined) && (<div className={merge([css.pins])}>{props.pin}</div>)}
    <div className={"title-block-mandarin"}>{props.chinese_title}</div>
    <div>
      <h1>{props.title}</h1>
      <div className={"title-block-phonetic"}>
        <span>zn.</span> [{props.phonetic}]
      </div>
    </div>
    {props.picked && (
        <div className={"title-block-counter"}>
          <span>{props.picked}</span>
          <span>/{props.total}</span>
        </div>
    )}
  </div></div>
}

export default NotebookTitle
