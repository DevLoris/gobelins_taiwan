import css from './NotebookPageElementsDetails.module.less';
import React, {useEffect, useRef} from 'react';
import {merge} from "../../../lib/utils/arrayUtils";
import {IStateDataCollectibleWithPickup} from "../../../store/state_interface_data";
import NotebookPhonetic from "../notebookPhonetic/NotebookPhonetic";
import NotebookAudio from "../notebookAudio/NotebookAudio";
import {IStateDataCollectibleAdditionalDataType} from "../../../store/state_enums";
import {useTranslation} from "react-i18next";
import gsap from "gsap";
import ButtonPicto, {ButtonPictoStyle} from "../../buttonPicto/ButtonPicto";

interface IProps {
  className?: string,
  data?: IStateDataCollectibleWithPickup,
  onExit?: () => any,
  leaveButton?: boolean
  elRef?: any
}

const componentName = "NotebookPageElementsDetails";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageElementsDetails
 * @desc Element détaillé avec les champs additionnels etc
 */
function NotebookPageElementsDetails (props: IProps) {
  const { t } = useTranslation();

  const contentBlockContainerRef = useRef();

  useEffect(() => {

    componentAnim();

  }, []);

  // Text inside page plays in
  function componentAnim(pDuration:number = .7) {
    gsap.fromTo(contentBlockContainerRef.current, {
      yPercent: 100,
    }, {
      duration: pDuration,
      yPercent: 0
    });
  }

  return <div ref={props.elRef} className={merge([css.root, css[props.className]])}>

    <div className={css.elementHeader}>
      {props.onExit && (
          <ButtonPicto disabled={false} picto={ButtonPictoStyle.PREVIOUS} onClick={props.onExit} className={css.exit}/>
      )}
      <div className={css.elementHeaderSubContainer}>
        <div className={css.elementHeaderStamp}>
          {(props.data.pickup)  && (
            <img src={props.data.stamp} alt={props.data.name} />
          )}
          {(!props.data.pickup)  && (
              <span>?</span>
          )}
        </div>
        <div className={css.elementHeaderTitle}>{props.data.pickup && props.data.name}</div>
      </div>
    </div>
    <div className={css.elementHeaderBg}/>

    <div ref={contentBlockContainerRef} >
    <div className={merge([css.contentBlockBorder, css.contentBlock])}>
      {(props.data.pickup)  && (
        <>
          <div className={"title-block"}>
            <div className={"title-block-mandarin"}>信息</div>
            <div className={"title-block-name"}>
              <h2>{t('notebook__page__elements__details__info')}</h2>
              <div className={"title-block-phonetic"}><span>zn.</span> [Xinxi]</div>
            </div>
          </div>
          <p className={"bigger"}>{props.data.text}</p>
        </>
      )}
    </div>

    {(props.data.pickup)  && (
      <div className={merge([css.contentBlock])}>
        {props.data.additional.map((value, k) => {
          let content = null;
          switch (value.type) {
            case IStateDataCollectibleAdditionalDataType.TEXT:
              content = (<p className={'bigger'}>{value.value}</p>);
              break;
            case IStateDataCollectibleAdditionalDataType.SEPARATOR:
              content = (<></>);
              break;
            case IStateDataCollectibleAdditionalDataType.IMAGE:
              content = (<img src={value.value} alt={"file"} className={css.image}/>);
              break;
            case IStateDataCollectibleAdditionalDataType.GALLERY:
              content = value.value.map(value =>  {
                return (<img src={value} alt={"file"} className={css.image}/>);
              });
              break;
            case IStateDataCollectibleAdditionalDataType.AUDIO:
              content = (<NotebookAudio audio={value.value}/>);
              break;
            case IStateDataCollectibleAdditionalDataType.TESTIMONIAL:
              content = (<>
                <div className={css["type" + value.type + "_title"]}>{t('notebook__page__elements__details__additional__testimonial')}</div>
                <p>{value.value}</p>
              </>);
              break;
            case IStateDataCollectibleAdditionalDataType.TIPS:
              content = (<>
                <div className={css["type" + value.type + "_title"]}><span>詭計</span>{t('notebook__page__elements__details__additional__tips')}</div>
                <p>{value.value}</p>
              </>);
              break;
            case IStateDataCollectibleAdditionalDataType.PHONETIC:
              content = (<NotebookPhonetic phonetic={value.value.phonetic} chinese={value.value.chinese} english={value.value.english}/>);
              break;
            case IStateDataCollectibleAdditionalDataType.YOUTUBE:
              content = (<iframe src={"https://www.youtube.com/embed/"  + value.value}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>)
              break;
          }
          return (<div key={k} className={css["type" +  value.type]}>{content}{value.credits
          && (<div className={css.credits}><span>{value.credits}</span></div>)}</div>);
        })}
      </div>
    )}
    </div>
  </div>
}

export default NotebookPageElementsDetails;
