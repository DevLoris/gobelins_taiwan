import css from './NotebookElement.module.less';
import React, {useRef} from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import {IStateDataCollectibleWithPickup} from "../../../store/state_interface_data";

interface IProps {
  className?: string,
  data?: IStateDataCollectibleWithPickup,
  callback?: () => any;
}

/**
 * @name NotebookElement
 * @desc Un élément du listing du carnet, une petite case où l'on a titre et image si on a ramassé, sinon rien
 */
function NotebookElement (props: IProps) {
  const interrogationMarkElRef = useRef(null);
  return <div onClick={props.callback} className={merge([css.root, props.className, props.data.pickup ? css.collected:  null])}>
    <div className={css.element}>
      {props.data.pickup && (<img src={props.data.stamp} title={props.data.name} />)}
      {!props.data.pickup && (<span ref={interrogationMarkElRef}>?</span>)}
    </div>
    <div className={css.name}>{props.data.pickup && props.data.name}</div>
  </div>
}

export default NotebookElement
