import css from './NotebookLabelToggler.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string,
  label?: string,
  active?:boolean
  onClick?: () => void,
}

/**
 * @name NotebookLabelToggler
 * @desc Bouton pour changer de page
 */
function NotebookLabelToggler (props: IProps) {
  return <div onClick={props.onClick} className={merge([css.root, props.className, props.active ? css.active : ''])}>
    <span>{props.label}</span>
  </div>
}

export default NotebookLabelToggler
