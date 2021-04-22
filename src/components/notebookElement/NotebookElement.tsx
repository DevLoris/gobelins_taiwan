import css from './NotebookElement.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {IStateDataCollectibleWithPickup} from "../../store/state_interface_data";

interface IProps {
  className?: string,
  data?: IStateDataCollectibleWithPickup,
  callback?: () => any;
}

const componentName = "NotebookElement";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookElement
 */
function NotebookElement (props: IProps) {
  return <div onClick={props.callback} className={merge([css.root, props.className])}>
    <img src={props.data.asset} title={props.data.name} />
    {props.data.pickup && ("Ramassé")}
    {!props.data.pickup && ("Pas ramassé")}
  </div>
}

export default NotebookElement
