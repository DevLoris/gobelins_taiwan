import css from './NotebookPageElementsDetails.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import {IStateDataCollectibleWithPickup} from "../../../store/state_interface_data";
import NotebookTitle from "../notebookTitle/NotebookTitle";

interface IProps {
  className?: string,
  data?: IStateDataCollectibleWithPickup,
  onExit?: () => any,
  leaveButton?: boolean
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
    {(props.leaveButton && (
        <button  onClick={props.onExit}>quitter</button>
    ))}
    <div className={"additional-content"}>
      {props.data.additional.map((value, k) => {
        let content = null;
        switch (value.type) {
          case "text":
            content = (<p>{value.value}</p>);
            break;
          case "image":
            content = (<img src={value.value}/>);
            break;
          case "youtube":
            content = (<div className={""}>
              <iframe src={"https://www.youtube.com/embed/"  + value.value}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>)
            break;
        }
        return (<div key={k}>{content}{value.credits
          && (<div>{value.credits}</div>)}</div>);
      })}
    </div>
  </div>
}

export default NotebookPageElementsDetails;
