import css from './NotebookPageElementsDetails.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import {IStateDataCollectibleWithPickup} from "../../../store/state_interface_data";
import NotebookTitle from "../notebookTitle/NotebookTitle";

interface IProps {
  className?: string,
  data?: IStateDataCollectibleWithPickup,
  onExit?: () => any
}

const componentName = "NotebookPageElementsDetails";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageElementsDetails
 */
function NotebookPageElementsDetails (props: IProps) {
  return <div className={merge([css.root, props.className])}>
    <NotebookTitle title={props.data.name}/>
    <p>{props.data.text}</p>
    <button  onClick={props.onExit}>quitter</button>
  </div>
}

export default NotebookPageElementsDetails
