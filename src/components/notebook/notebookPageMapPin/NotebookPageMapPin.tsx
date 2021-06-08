import css from './NotebookPageMapPin.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string,
  x: number,
  y: number,
  content: string,
  onClick: () => void,
}

const componentName = "NotebookPageMapPin";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageMapPin
 */
function NotebookPageMapPin (props: IProps) {
  return <div onClick={props.onClick} style={{top: props.y + "%", left: props.x + "%"}} className={merge([css.root, props.className])}>
    <svg xmlns="http://www.w3.org/2000/svg" width="36.591" height="36.407" viewBox="0 0 36.591 36.407">
      <g id="Groupe_59" data-name="Groupe 59" transform="translate(0.5 0.5)">
        <path id="Tracé_237" data-name="Tracé 237" d="M1313.666-303.424l-.54,3.049-.63,3.015-1.2,2.863-1.992,2.381-2.166,2.18-2.446,1.892-2.878,1.133-2.922,1.055-3.108.321-3.124-.228-2.9-1.16L1287-288.268l-2.718-1.5-1.962-2.4-1.9-2.418-1.38-2.765-.879-2.976-.083-3.1.22-3.073.953-2.923,1.263-2.788,1.7-2.558,2.146-2.218,2.513-1.808,2.868-1.153,2.945-.933,3.088-.062,3.072.153,2.949.875,2.917,1.058,2.589,1.738,1.971,2.4,1.965,2.391,1.283,2.823.671,3.014Z" transform="translate(-1278.083 320.94)" fill="#fff"/>
        <path id="Tracé_238" data-name="Tracé 238" d="M1313.666-303.424l-.54,3.049-.63,3.015-1.2,2.863-1.992,2.381-2.166,2.18-2.446,1.892-2.878,1.133-2.922,1.055-3.108.321-3.124-.228-2.9-1.16L1287-288.268l-2.718-1.5-1.962-2.4-1.9-2.418-1.38-2.765-.879-2.976-.083-3.1.22-3.073.953-2.923,1.263-2.788,1.7-2.558,2.146-2.218,2.513-1.808,2.868-1.153,2.945-.933,3.088-.062,3.072.153,2.949.875,2.917,1.058,2.589,1.738,1.971,2.4,1.965,2.391,1.283,2.823.671,3.014Z" transform="translate(-1278.083 320.94)" fill="#d8493d" stroke="#111d30" strokeMiterlimit="10" strokeWidth="1"/>
      </g>
    </svg>
    <span className={css.text}>{props.content}</span>
  </div>
}

export default NotebookPageMapPin
