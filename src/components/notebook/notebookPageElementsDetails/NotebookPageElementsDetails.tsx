import css from './NotebookPageElementsDetails.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import {IStateDataCollectibleWithPickup} from "../../../store/state_interface_data";
import NotebookTitle from "../notebookTitle/NotebookTitle";
import NotebookPhonetic from "../notebookPhonetic/NotebookPhonetic";
import NotebookAudio from "../notebookAudio/NotebookAudio";

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
  return <div className={merge([css.root, css[props.className]])}>

    <div className={css.elementHeader}>
      {props.onExit && (
          <img src={"/public/da/go_back.png"} className={css.exit} onClick={props.onExit}/>
      )}
      <div>
        <div className={css.elementHeaderStamp}>
          {(props.data.pickup)  && (
            <img src={props.data.asset} alt={props.data.name} />
          )}
          {(!props.data.pickup)  && (
              <span>?</span>
          )}
        </div>
        <div className={css.elementHeaderTitle}>{props.data.pickup && props.data.name}</div>
      </div>
    </div>
    <div className={css.elementHeaderBg}/>

    <div className={merge([css.contentBlockBorder, css.contentBlock])}>

      {(props.data.pickup)  && (
        <>
          <div className={"title-block"}>
            <div className={"title-block-mandarin"}>信息</div>
            <div className={"title-block-name"}>
              <h2>Info</h2>
              <div className={"title-block-phonetic"}><span>zn.</span> [Xinxi]</div>
            </div>
          </div>
          <p className={"bigger"}>{props.data.text}</p>
          <NotebookPhonetic/>
        </>
      )}
    </div>

    {(props.data.pickup)  && (
      <div className={merge([css.contentBlock])}>
        {props.data.additional.map((value, k) => {
          let content = null;
          switch (value.type) {
            case "text":
              content = (<p>{value.value}</p>);
              break;
            case "image":
              content = (<img src={value.value} alt={"file"} className={css.image}/>);
              break;
            case "gallery":
              content = value.value.map(value =>  {
                return (<img src={value} alt={"file"} className={css.image}/>);
              });
              break;
            case "audio":
              content = (<NotebookAudio audio={value.value}/>);
              break;
            case "youtube":
              content = (<div className={""}>
                <iframe src={"https://www.youtube.com/embed/"  + value.value}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>)
              break;
          }
          return (<div key={k} className={css["type" +  value.type]}>{content}{value.credits
          && (<div className={css.credits}><span>{value.credits}</span></div>)}</div>);
        })}
      </div>
    )}
  </div>
}

export default NotebookPageElementsDetails;
